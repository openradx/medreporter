import { resolver } from "@blitzjs/rpc"
import { paginate } from "blitz"
import db, { Prisma } from "db"

interface GetModuleTags
  extends Pick<Prisma.TagTranslationFindManyArgs, "orderBy" | "skip" | "take"> {
  language: string
  filter: string
}

export default resolver.pipe(
  async ({ language, filter = "", orderBy, skip = 0, take = 100 }: GetModuleTags) => {
    const where: Prisma.TagTranslationWhereInput = {
      language,
      tag: { modules: { some: {} } },
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
      count: () => db.tagTranslation.count({ where }),
      query: (paginateArgs) =>
        db.tagTranslation.findMany({
          ...paginateArgs,
          where,
          orderBy,
          select: { label: true },
        }),
    })

    return {
      tags: tags.map((tag) => tag.label),
      nextPage,
      hasMore,
      count,
    }
  }
)
