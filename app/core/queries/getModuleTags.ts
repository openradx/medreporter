import { resolver } from "@blitzjs/rpc"
import { paginate } from "blitz"
import db, { Prisma } from "db"

interface GetModuleTags
  extends Pick<Prisma.ModuleTagTranslationFindManyArgs, "orderBy" | "skip" | "take"> {
  language: string
  filter: string
}

export default resolver.pipe(
  async ({ language, filter = "", orderBy, skip = 0, take = 100 }: GetModuleTags) => {
    // TODO: implement institutional and private modules tags

    const where: Prisma.ModuleTagTranslationWhereInput = {
      OR: [
        { language },
        {
          moduleTranslation: {
            module: {
              translations: {
                none: {
                  language,
                },
              },
            },
          },
        },
      ],
      moduleTranslation: {
        module: {
          releaseStatus: "PUBLISHED",
        },
      },
    }

    const {
      items: tags,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () =>
        db.moduleTagTranslation.count({
          where,
          orderBy,
          // TODO: not really working as we can't use distinct in here, see
          // https://github.com/prisma/prisma/issues/4228
        }),
      query: (paginateArgs) =>
        db.moduleTagTranslation.findMany({
          ...paginateArgs,
          where,
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
