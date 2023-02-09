import {
  createMonolingualModuleDraft,
  createMultilingualModuleDraft,
  MultilingualModuleDraftContext,
  parseModule,
} from "@medreporter/medtl-tools"
import { Prisma, ReleaseStatus } from "@prisma/client"
import { TRPCError } from "@trpc/server"
import { createFilterObject } from "~/utils/filterObject"
import { createClient } from "~/utils/i18nServerClient"
import { paginate } from "~/utils/pagination"
import { buildModuleTranslationsArgs } from "~/utils/translations"
import { GetTranslatedModulesSchema } from "~/validations/admin"
import {
  buildCreateModuleSchema,
  FetchOwnModuleSchema,
  GetCategoriesSchema,
  GetFigureSchema,
  GetModuleSchema,
} from "~/validations/common"
import { prisma } from "../prisma"
import { authedProcedure, publicProcedure, router } from "../trpc"

export const commonRouter = router({
  createModule: authedProcedure
    .input(buildCreateModuleSchema())
    .mutation(async ({ input, ctx }) => {
      const { name, multilingual, defaultLanguage, visibility } = input
      const { user } = ctx

      const { i18n, initPromise } = createClient({
        preload: [defaultLanguage],
        ns: "drafts",
      })

      await initPromise

      const context: MultilingualModuleDraftContext = {
        lng: i18n.t("Module.lng"),
        title: i18n.t("Module.title"),
        description: i18n.t("Module.description"),
        fieldLabel: i18n.t("Module.fieldLabel"),
      }

      let source: string
      if (multilingual) {
        source = createMultilingualModuleDraft(context)
      } else {
        source = createMonolingualModuleDraft(context)
      }

      const document = parseModule(source)
      const translations = buildModuleTranslationsArgs(document)

      const createdModule = await prisma.module.create({
        data: {
          name,
          authorId: user.id,
          source,
          document: document as Record<string, any> as Prisma.JsonObject,
          translations,
          visibility,
          releaseStatus: ReleaseStatus.DRAFT,
        },
        select: { id: true, name: true, author: { select: { username: true } } },
      })

      return {
        id: createdModule.id,
        name: createdModule.name,
        author: createdModule.author.username,
      }
    }),
  fetchOwnModule: authedProcedure.input(FetchOwnModuleSchema).mutation(async ({ input, ctx }) => {
    const { name } = input
    const { user } = ctx

    return await prisma.module.findUnique({
      where: { authorId_name: { authorId: user.id, name } },
    })
  }),
  getCategories: publicProcedure.input(GetCategoriesSchema).query(async ({ input }) => {
    const { language, filter, usedByModule, usedByTemplate, skip, take } = input

    const where: Prisma.CategoryTranslationWhereInput = {
      language,
      category: {
        modules: usedByModule ? { some: {} } : {},
        templates: usedByTemplate ? { some: {} } : {},
      },
      label: filter ? { contains: filter, mode: "insensitive" } : {},
    }

    const {
      items: categories,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => prisma.categoryTranslation.count({ where }),
      query: (paginateArgs) =>
        prisma.categoryTranslation.findMany({
          ...paginateArgs,
          where,
          orderBy: { label: "asc" },
          select: { label: true, category: { select: { key: true } } },
        }),
    })

    return {
      categories: categories.map((category) => ({
        key: category.category.key,
        label: category.label,
      })),
      nextPage,
      hasMore,
      count,
    }
  }),
  getFigure: publicProcedure.input(GetFigureSchema).query(async ({ input }) => {
    const { username, figureName } = input

    const figure = await prisma.figure.findFirst({
      where: { author: { username }, name: figureName },
      include: { author: { select: { email: true, username: true } } },
    })

    if (!figure) {
      throw new TRPCError({ code: "NOT_FOUND" })
    }

    return figure
  }),
  getModule: publicProcedure.input(GetModuleSchema).query(async ({ input }) => {
    const { username, moduleName } = input

    const module_ = await prisma.module.findFirst({
      where: { author: { username }, name: moduleName },
      include: { author: { select: { email: true, username: true } } },
    })

    if (!module_) {
      throw new TRPCError({ code: "NOT_FOUND" })
    }

    return module_
  }),
  getTranslatedModules: publicProcedure
    .input(GetTranslatedModulesSchema)
    .query(async ({ input, ctx }) => {
      const { language, filter, skip, take } = input
      const { user } = ctx

      const filterObject = createFilterObject(filter ?? "", [
        "title",
        "author",
        "category",
        "language",
      ])

      // TODO: Optionally show depreciated modules

      // We can't query the modules directly as Prisma can't order by a n-1 relation
      // yet, see https://github.com/prisma/prisma/issues/5837
      const where: Prisma.ModuleTranslationWhereInput = {
        AND: [
          {
            AND: [
              {
                module: {
                  OR: [
                    { releaseStatus: "PUBLISHED" },
                    user?.id ? { releaseStatus: "DRAFT", authorId: user.id } : {},
                  ],
                },
              },
              {
                module: {
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
                module: { translations: { none: { language } } },
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
                module: { author: { username: { equals: term } } },
              })),
              ...filterObject.language.map((term) => ({
                module: { translations: { some: { language: { equals: term } } } },
              })),
              filterObject.category.length > 0
                ? {
                    module: {
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
        items: moduleTranslations,
        hasMore,
        nextPage,
        count,
      } = await paginate({
        skip,
        take,
        count: () => prisma.moduleTranslation.count({ where }),
        query: (paginateArgs) =>
          prisma.moduleTranslation.findMany({
            ...paginateArgs,
            where,
            orderBy: { title: "asc" },
            include: {
              module: {
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
        modules: moduleTranslations.map((moduleTranslation) => ({
          id: moduleTranslation.module.id,
          title: moduleTranslation.title,
          description: moduleTranslation.description,
          categories: moduleTranslation.module.categories.map((category) => {
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
