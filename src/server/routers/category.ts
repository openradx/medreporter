import { Prisma } from "@prisma/client"
import { paginate } from "~/utils/pagination"
import { GetCategoriesSchema } from "~/validations/categories"
import { prisma } from "../prisma"
import { publicProcedure, router } from "../trpc"

export const categoryRouter = router({
  getCategories: publicProcedure.input(GetCategoriesSchema).query(async ({ input }) => {
    const { language, filter, skip, take } = input

    const where: Prisma.CategoryWhereInput = {
      templates: { some: { language } },
      key: filter ? { contains: filter, mode: "insensitive" } : {},
    }

    const {
      items: categories,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => prisma.category.count({ where }),
      query: (paginateArgs) =>
        prisma.category.findMany({
          ...paginateArgs,
          where,
          orderBy: { key: "asc" },
          select: { key: true },
        }),
    })

    return {
      categories: categories.map((category) => category.key),
      nextPage,
      hasMore,
      count,
    }
  }),
})
