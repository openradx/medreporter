import { resolver } from "@blitzjs/rpc"
import { paginate } from "blitz"
import db, { Prisma } from "db"

interface GetModuleCategories
  extends Pick<Prisma.CategoryTranslationFindManyArgs, "orderBy" | "skip" | "take"> {
  language: string
  filter: string
}

export default resolver.pipe(
  async ({ language, filter = "", orderBy, skip = 0, take = 100 }: GetModuleCategories) => {
    const where: Prisma.CategoryTranslationWhereInput = {
      language,
      category: { modules: { some: {} } },
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
          select: { label: true },
        }),
    })

    return {
      categories: categories.map((category) => category.label),
      nextPage,
      hasMore,
      count,
    }
  }
)
