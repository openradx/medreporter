import { resolver } from "@blitzjs/rpc"
import { paginate } from "blitz"
import db, { Prisma } from "db"

const moduleWithAuthor = Prisma.validator<Prisma.ModuleArgs>()({
  select: {
    id: true,
    moduleId: true,
    languages: true,
    author: { select: { email: true, username: true } },
  },
})

export interface TranslatedModule extends Prisma.ModuleGetPayload<typeof moduleWithAuthor> {
  title: string
  description: string
  tags: string[]
}

interface GetTranslatedModules
  extends Pick<Prisma.ModuleTranslationFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  async ({ where = {}, orderBy, skip = 0, take = 100 }: GetTranslatedModules) => {
    // TODO: implement institutional and private modules

    // We can't query the modules directly as Prisma can't order by a n-1 relation
    // yet, see https://github.com/prisma/prisma/issues/5837

    const {
      items: moduleTranslations,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.moduleTranslation.count({ where }),
      query: (paginateArgs) =>
        db.moduleTranslation.findMany({
          ...paginateArgs,
          where,
          orderBy,
          include: {
            module: {
              select: {
                id: true,
                name: true,
                languages: true,
                author: { select: { email: true, username: true } },
              },
            },
            tags: { select: { label: true } },
          },
        }),
    })

    return {
      modules: moduleTranslations.map((moduleTranslation) => ({
        title: moduleTranslation.title,
        description: moduleTranslation.description,
        tags: moduleTranslation.tags.map((tag) => tag.label),
        ...moduleTranslation.module,
      })),
      nextPage,
      hasMore,
      count,
    }
  }
)
