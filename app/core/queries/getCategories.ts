import { resolver } from "@blitzjs/rpc"
import { paginate } from "blitz"
import db, { Prisma } from "db"

interface GetModuleCategories
  extends Pick<Prisma.CategoryTranslationFindManyArgs, "orderBy" | "skip" | "take"> {
  language: string
  filter?: string
  usedByModule?: boolean
  usedByTemplate?: boolean
}

export default resolver.pipe(
  async ({
    language,
    filter = "",
    usedByModule = false,
    usedByTemplate = false,
    orderBy,
    skip = 0,
    take = 100,
  }: GetModuleCategories) => {
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
      count: () => db.categoryTranslation.count({ where }),
      query: (paginateArgs) =>
        db.categoryTranslation.findMany({
          ...paginateArgs,
          where,
          orderBy,
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
  }
)
