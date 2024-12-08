import { GetTemplatesSchema } from "~/validations/templates"
import { prisma } from "../prisma"
import { publicProcedure, router } from "../trpc"

export const templatesRouter = router({
  getTemplates: publicProcedure.input(GetTemplatesSchema).query(async ({ input }) => {
    const { language, filter, skip, take } = input

    const where = {
      language,
      key: filter ? { contains: filter, mode: "insensitive" } : {},
    }

    const templates = await prisma.template.findMany({
      where,
      orderBy: { updatedAt: "desc" },
      skip,
      take,
      select: { title: true, description: true, language: true },
    })

    const count = await prisma.template.count({ where })

    return {
      templates,
      count,
    }
  }),
})
