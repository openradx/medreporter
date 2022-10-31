import { resolver } from "@blitzjs/rpc"
import { paginate } from "blitz"
import db, { Prisma, UserRole } from "db"
import { GetUsers } from "../validations"

export default resolver.pipe(
  resolver.zod(GetUsers),
  resolver.authorize(UserRole.SUPERADMIN),
  async ({ filter, skip, take }) => {
    const where: Prisma.UserWhereInput = filter
      ? {
          OR: [
            { email: { contains: filter, mode: "insensitive" } },
            { username: { contains: filter, mode: "insensitive" } },
          ],
        }
      : {}

    const {
      items: users,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.user.count({ where }),
      query: (paginateArgs) =>
        db.user.findMany({ ...paginateArgs, where, orderBy: { username: "asc" } }),
    })

    return {
      users,
      nextPage,
      hasMore,
      count,
    }
  }
)
