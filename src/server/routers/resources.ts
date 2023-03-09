import { parseModule } from "@medreporter/medtl-tools"
import { Prisma, ReleaseStatus } from "@prisma/client"
import { TRPCError } from "@trpc/server"
import { createFigureDraftSource, createModuleDraftSource } from "~/server/utils/draftUtils"
import { createClient } from "~/server/utils/i18nServerClient"
import {
  createFigureTranslationsUpdateArgs,
  createModuleTranslationsUpdateArgs,
} from "~/server/utils/resourceUtils"
import { createFilterObject } from "~/utils/filterObject"
import { paginate } from "~/utils/pagination"
import {
  buildCreateResourceSchema,
  FetchOwnResourceSchema,
  GetResourceSchema,
  GetTranslatedResourcesSchema,
  UpdateResourceSchema,
} from "~/validations/resources"
import { prisma } from "../prisma"
import { authedProcedure, publicProcedure, router } from "../trpc"
import { createFigureDocument } from "../utils/figureUtils"

export const resourcesRouter = router({
  createResource: authedProcedure
    .input(buildCreateResourceSchema())
    .mutation(async ({ input, ctx }) => {
      const { type, name, language, visibility } = input
      const { user } = ctx

      const { i18n, initPromise } = createClient({
        preload: [language],
        ns: "drafts",
      })
      await initPromise

      let source: string
      let doc: Prisma.JsonValue
      let resourceTranslationsUpdateArgs: Prisma.ResourceUpdateArgs["data"]["translations"]
      if (type === "FIGURE") {
        source = createFigureDraftSource(i18n)
        const figureDocument = createFigureDocument(source)
        doc = figureDocument
        resourceTranslationsUpdateArgs = createFigureTranslationsUpdateArgs(figureDocument.meta)
      } else if (type === "MODULE") {
        source = createModuleDraftSource(i18n)
        const moduleDocument = parseModule(source)
        doc = moduleDocument as Record<string, any>
        resourceTranslationsUpdateArgs = createModuleTranslationsUpdateArgs(moduleDocument)
      } else if (type === "TEMPLATE") {
        // TODO:
        source = ""
        doc = ""
        resourceTranslationsUpdateArgs = {}
      } else throw new Error(`Invalid resource type "${type}".`)

      const createdResource = await prisma.resource.create({
        data: {
          type,
          name,
          authorId: user.id,
          source,
          document: doc,
          translations: resourceTranslationsUpdateArgs,
          visibility,
          releaseStatus: ReleaseStatus.DRAFT,
        },
        select: { id: true, name: true, author: { select: { username: true } } },
      })

      return {
        id: createdResource.id,
        name: createdResource.name,
        author: createdResource.author.username,
      }
    }),

  updateResource: authedProcedure.input(UpdateResourceSchema).mutation(async ({ input, ctx }) => {
    const { id, source, visibility, categories, releaseStatus } = input
    const { user } = ctx

    const resource = await prisma.resource.findUnique({ where: { id } })
    if (!resource)
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "The resource to update could not be found.",
      })
    if (resource?.authorId !== user.id)
      throw new TRPCError({ code: "UNAUTHORIZED", message: "Only own resources can be updated." })

    let doc: Prisma.InputJsonValue | undefined
    let resourceTranslationsUpdateArgs:
      | Prisma.ResourceUpdateArgs["data"]["translations"]
      | undefined
    if (source !== undefined) {
      // TODO: other resource types
      if (resource.type === "FIGURE") {
        const figureDocument = createFigureDocument(source)
        resourceTranslationsUpdateArgs = createFigureTranslationsUpdateArgs(figureDocument.meta)
        doc = figureDocument
      } else throw new Error(`Invalid resource type "${resource.type}".`)
    }

    return await prisma.resource.update({
      where: { id },
      data: {
        source,
        document: doc,
        translations: resourceTranslationsUpdateArgs,
        visibility,
        releaseStatus,
      },
    })
  }),

  fetchOwnResource: authedProcedure
    .input(FetchOwnResourceSchema)
    .mutation(async ({ input, ctx }) => {
      const { type, name } = input
      const { user } = ctx

      return await prisma.resource.findUnique({
        where: { type_authorId_name: { type, authorId: user.id, name } },
      })
    }),

  getResource: publicProcedure.input(GetResourceSchema).query(async ({ input }) => {
    const { type, author, name } = input

    const resource = await prisma.resource.findFirst({
      where: { type, author: { username: author }, name },
      include: { author: { select: { username: true } } },
    })

    if (!resource) {
      throw new TRPCError({ code: "NOT_FOUND" })
    }

    return resource
  }),

  getTranslatedResources: publicProcedure
    .input(GetTranslatedResourcesSchema)
    .query(async ({ input, ctx }) => {
      const { type, siteLanguage, filter, skip, take } = input
      const { user } = ctx

      const filterObject = createFilterObject(filter ?? "", [
        "title",
        "author",
        "category",
        "language",
      ])

      // TODO: Optionally show depreciated resources

      // We can't query the resources directly as Prisma can't order by a n-1 relation yet,
      // see https://github.com/prisma/prisma/issues/5837
      const where: Prisma.ResourceTranslationWhereInput = {
        AND: [
          {
            AND: [
              { resource: { type } },
              {
                resource: {
                  OR: [
                    { releaseStatus: "PUBLISHED" },
                    user?.id ? { releaseStatus: "DRAFT", authorId: user.id } : {},
                  ],
                },
              },
              {
                resource: {
                  OR: [
                    { visibility: "PUBLIC" },
                    user?.currentInstituteId
                      ? { visibility: "INSTITUTE", instituteId: user.currentInstituteId }
                      : {},
                    user?.id ? { visibility: "PRIVATE", authorId: user.id } : {},
                  ],
                },
              },
            ],
          },
          {
            OR: [
              { language: siteLanguage },
              {
                resource: { translations: { none: { language: siteLanguage } } },
                default: true,
              },
            ],
          },
          {
            OR: [
              ...filterObject.title.map((term) => ({
                title: { contains: term, mode: "insensitive" as const },
              })),
              ...filterObject.author.map((term) => ({
                resource: { author: { username: { equals: term } } },
              })),
              ...filterObject.language.map((term) => ({
                resource: { translations: { some: { language: { equals: term } } } },
              })),
              filterObject.category.length > 0
                ? {
                    resource: {
                      categories: {
                        some: {
                          Category: {
                            translations: {
                              some: {
                                language: siteLanguage,
                                label: { in: filterObject.category },
                              },
                            },
                          },
                        },
                      },
                    },
                  }
                : {},
            ],
          },
        ],
      }

      const {
        items: resourceTranslations,
        hasMore,
        nextPage,
        count,
      } = await paginate({
        skip,
        take,
        count: () => prisma.resourceTranslation.count({ where }),
        query: (paginateArgs) =>
          prisma.resourceTranslation.findMany({
            ...paginateArgs,
            where,
            orderBy: { title: "asc" },
            include: {
              resource: {
                select: {
                  id: true,
                  name: true,
                  author: { select: { username: true } },
                  translations: {
                    select: {
                      language: true,
                    },
                  },
                  releaseStatus: true,
                  visibility: true,
                  categories: {
                    select: {
                      Category: {
                        select: {
                          key: true,
                          translations: {
                            select: {
                              language: true,
                              label: true,
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          }),
      })

      return {
        resources: resourceTranslations.map((resourceTranslation) => ({
          id: resourceTranslation.resource.id,
          name: resourceTranslation.resource.name,
          title: resourceTranslation.title,
          description: resourceTranslation.description,
          author: { username: resourceTranslation.resource.author.username },
          categories: resourceTranslation.resource.categories.map((category) => {
            const label = category.Category.translations.find(
              (translation) => translation.language === siteLanguage
            )?.label

            if (label === undefined) {
              const { key } = category.Category
              // eslint-disable-next-line no-console
              console.warn(`Missing translation for category with key ${key}.`)
              return key
            }

            return label
          }),
        })),
        nextPage,
        hasMore,
        count,
      }
    }),
})
