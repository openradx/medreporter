import { Prisma } from "@prisma/client"
import { paginate } from "~/utils/pagination"
import { GetCategoriesSchema } from "~/validations/categories"
import { prisma } from "../prisma"
import { publicProcedure, router } from "../trpc"

export const categoriesRouter = router({
  getCategories: publicProcedure.input(GetCategoriesSchema).query(async ({ input }) => {
    const { language, type, filter, skip, take } = input

    const where: Prisma.CategoryTranslationWhereInput = {
      language,
      category: type !== undefined ? { resources: { some: { resource: { type } } } } : {},
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
})
