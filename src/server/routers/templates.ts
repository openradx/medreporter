import { Prisma } from "@prisma/client"
import {
  AUTHOR_ASC,
  AUTHOR_DESC,
  CREATED_ASC,
  CREATED_DESC,
  TITLE_ASC,
  TITLE_DESC,
} from "~/constants/sorting-options"
import { GetTemplatesSchema } from "~/validations/templates"
import { prisma } from "../prisma"
import { publicProcedure, router } from "../trpc"

export const templatesRouter = router({
  getTemplates: publicProcedure.input(GetTemplatesSchema).query(async ({ input }) => {
    const { categories, language, search, username, sorting, skip, take } = input

    const where: Prisma.TemplateWhereInput = {
      AND: categories.map((category) => ({
        categories: { some: { key: category } },
      })),
      language: language ? { equals: language } : {},
      title: search ? { contains: search } : {},
      author: username ? { username } : {},
    }

    let orderBy
    switch (sorting) {
      case CREATED_DESC:
        orderBy = { updatedAt: "desc" } as const
        break
      case CREATED_ASC:
        orderBy = { updatedAt: "asc" } as const
        break
      case AUTHOR_ASC:
        orderBy = { author: { username: "asc" } } as const
        break
      case AUTHOR_DESC:
        orderBy = { author: { username: "desc" } } as const
        break
      case TITLE_ASC:
        orderBy = { title: "asc" } as const
        break
      case TITLE_DESC:
        orderBy = { title: "desc" } as const
        break
      default:
        orderBy = { updatedAt: "desc" } as const
    }

    const templates = await prisma.template.findMany({
      where,
      orderBy,
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

  getTemplateLanguages: publicProcedure.query(async () => {
    const languages = await prisma.template.findMany({
      distinct: ["language"],
      select: {
        language: true,
      },
    })

    return languages.map((lang) => lang.language)
  }),
})
