import { GetCategoriesSchema } from "~/validations/categories"
import { prisma } from "../prisma"
import { publicProcedure, router } from "../trpc"

export const categoriesRouter = router({
  getCategories: publicProcedure.input(GetCategoriesSchema).query(async ({ input }) => {
    const { language, prefix } = input

    const categories = await prisma.category.findMany({
      where: {
        templates: language ? { some: { language } } : {},
        key: { startsWith: prefix },
      },
      orderBy: { key: "asc" },
      select: { key: true },
    })

    return {
      categories,
    }
  }),
})
