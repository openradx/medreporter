import { resolver } from "@blitzjs/rpc"
import { paginate } from "blitz"
import { z } from "zod"
import db, { MembershipRole, Prisma, UserRole } from "db"

interface GetInstitutes
  extends Pick<Prisma.InstituteFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(z.any()),
  async (
    { where = {}, orderBy, skip = 0, take = 100 }: GetInstitutes,
    { session: { userId, roles } }
  ) => {
    if (!roles.includes(UserRole.SUPERADMIN)) {
      where.memberships = {
        some: { userId, role: { in: [MembershipRole.OWNER, MembershipRole.ADMIN] } },
      }
    }
    const {
      items: institutes,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.institute.count({ where }),
      query: (paginateArgs) => db.institute.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      institutes,
      nextPage,
      hasMore,
      count,
    }
  }
)
