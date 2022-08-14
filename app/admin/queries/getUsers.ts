import { resolver } from "@blitzjs/rpc"
import { paginate } from "blitz"
import db, { Prisma, UserRole } from "db"

interface GetUsers extends Pick<Prisma.UserFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(UserRole.SUPERADMIN),
  async ({ where = {}, orderBy, skip = 0, take = 100 }: GetUsers) => {
    const {
      items: users,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.user.count({ where }),
      query: (paginateArgs) => db.user.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      users,
      nextPage,
      hasMore,
      count,
    }
  }
)
