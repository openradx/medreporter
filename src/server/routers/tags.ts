import { Prisma } from "@prisma/client"
import { paginate } from "~/utils/pagination"
import { GetTagsSchema } from "~/validations/tags"
import { prisma } from "../prisma"
import { publicProcedure, router } from "../trpc"

export const tagsRouter = router({
  getTags: publicProcedure.input(GetTagsSchema).query(async ({ input }) => {
    const { locale, filter, skip, take } = input

    const where: Prisma.TagWhereInput = {
      templates: { some: { template: { locale } } },
      label: filter ? { contains: filter, mode: "insensitive" } : {},
    }

    const {
      items: tags,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => prisma.tag.count({ where }),
      query: (paginateArgs) =>
        prisma.tag.findMany({
          ...paginateArgs,
          where,
          orderBy: { label: "asc" },
          select: { label: true },
        }),
    })

    return {
      tags: tags.map((tag) => tag.label),
      nextPage,
      hasMore,
      count,
    }
  }),
})
