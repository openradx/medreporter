import { resolver } from "@blitzjs/rpc"
import { paginate } from "blitz"
import db, { Prisma } from "db"
import { GetCategories } from "app/core/validations"

export default resolver.pipe(
  resolver.zod(GetCategories),
  async ({ language, filter, usedByModule, usedByTemplate, skip, take }) => {
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
  }
)
