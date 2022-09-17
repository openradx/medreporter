import { resolver } from "@blitzjs/rpc"
import { paginate } from "blitz"
import db, { Prisma } from "db"
import { GetTranslatedModules } from "app/admin/validations"
import { createFilterObject } from "../utils/filterObject"

const moduleWithAuthor = Prisma.validator<Prisma.ModuleArgs>()({
  select: {
    id: true,
    name: true,
    author: { select: { email: true, username: true } },
  },
})

export interface TranslatedModule extends Prisma.ModuleGetPayload<typeof moduleWithAuthor> {
  title: string
  description: string
  categories: string[]
}

export default resolver.pipe(
  resolver.zod(GetTranslatedModules),
  async ({ language, filter, skip, take }, { session }) => {
    const { userId: authorId, currentInstituteId: instituteId } = session

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
                  authorId ? { releaseStatus: "DRAFT", authorId } : {},
                ],
              },
            },
            {
              module: {
                OR: [
                  { visibility: "PUBLIC" },
                  instituteId ? { visibility: "INSTITUTE", instituteId } : {},
                  authorId ? { visibility: "PRIVATE", authorId } : {},
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
      count: () => db.moduleTranslation.count({ where }),
      query: (paginateArgs) =>
        db.moduleTranslation.findMany({
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
  }
)
