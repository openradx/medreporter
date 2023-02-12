import { parseModule } from "@medreporter/medtl-tools"
import { Prisma, ReleaseStatus } from "@prisma/client"
import { TRPCError } from "@trpc/server"
import { createFilterObject } from "~/utils/filterObject"
import { createClient } from "~/utils/i18nServerClient"
import { paginate } from "~/utils/pagination"
import {
  createModuleSource,
  createModuleTranslations,
  ResourceTranslationsUpdateArgs,
} from "~/utils/serverSideResourceUtils"
import {
  buildCreateResourceSchema,
  FetchOwnResourceSchema,
  GetResourceSchema,
  GetTranslatedResourcesSchema,
} from "~/validations/resources"
import { prisma } from "../prisma"
import { authedProcedure, publicProcedure, router } from "../trpc"

export const resourcesRouter = router({
  createNewResource: authedProcedure
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
      let document: Prisma.JsonValue
      let translations: ResourceTranslationsUpdateArgs
      if (type === "FIGURE") {
        // TODO:
        source = ""
        document = ""
        translations = {}
      } else if (type === "MODULE") {
        source = createModuleSource(i18n.t)
        const doc = parseModule(source)
        document = doc as Record<string, any>
        translations = createModuleTranslations(doc)
      } else if (type === "TEMPLATE") {
        // TODO:
        source = ""
        document = ""
        translations = {}
      } else {
        throw new Error(`Invalid resource type "${type}".`)
      }

      const createdResource = await prisma.resource.create({
        data: {
          type,
          name,
          authorId: user.id,
          source,
          document,
          translations,
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
      include: { author: { select: { email: true, username: true } } },
    })

    if (!resource) {
      throw new TRPCError({ code: "NOT_FOUND" })
    }

    return resource
  }),

  getTranslatedResources: publicProcedure
    .input(GetTranslatedResourcesSchema)
    .query(async ({ input, ctx }) => {
      const { type, language, filter, skip, take } = input
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
              { language },
              {
                resource: { translations: { none: { language } } },
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
                              some: { language, label: { in: filterObject.category } },
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
                  author: { select: { email: true, username: true } },
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
          title: resourceTranslation.title,
          description: resourceTranslation.description,
          categories: resourceTranslation.resource.categories.map((category) => {
            const label = category.Category.translations.find(
              (translation) => translation.language === language
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
