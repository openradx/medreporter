import { GetTemplatesSchema } from "~/validations/templates"
import { prisma } from "../prisma"
import { publicProcedure, router } from "../trpc"

export const templatesRouter = router({
  getTemplates: publicProcedure.input(GetTemplatesSchema).query(async ({ input }) => {
    const { categories, language, search, skip, take } = input

    const where = {
      AND: categories.map((category) => ({
        categories: { some: { key: category } },
      })),
      language: language ? { equals: language } : {},
      title: search ? { contains: search } : {},
    }

    const templates = await prisma.template.findMany({
      where,
      orderBy: { updatedAt: "desc" },
      skip,
      take,
      select: {
        slug: true,
        language: true,
        title: true,
        description: true,
        updatedAt: true,
        releaseStatus: true,
        author: {
          select: {
            username: true,
          },
        },
        categories: {
          select: {
            key: true,
          },
        },
      },
    })

    const count = await prisma.template.count({ where })

    return {
      templates,
      count,
    }
  }),
})
