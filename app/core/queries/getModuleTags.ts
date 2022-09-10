import { resolver } from "@blitzjs/rpc"
import { paginate } from "blitz"
import db, { Prisma } from "db"

interface GetModuleTags
  extends Pick<Prisma.ModuleTagTranslationFindManyArgs, "where" | "orderBy" | "skip" | "take"> {
  language: string
}

export default resolver.pipe(
  async ({ language, where = {}, orderBy, skip = 0, take = 100 }: GetModuleTags) => {
    // TODO: implement institutional and private modules tags

    const {
      items: tags,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.moduleTagTranslation.count({ where }),
      query: (paginateArgs) =>
        db.moduleTagTranslation.findMany({
          ...paginateArgs,
          where: {
            OR: [
              {
                moduleTranslation: { module: { languages: { has: language } } },
                language,
              },
              {
                moduleTranslation: {
                  module: { NOT: { languages: { has: language } }, languages: { has: "en" } },
                },
                language: "en",
              },
            ],
          },
          orderBy,
          select: { label: true },
          distinct: ["label"],
        }),
    })

    return {
      tags,
      nextPage,
      hasMore,
      count,
    }
  }
)
