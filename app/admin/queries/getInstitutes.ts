import { resolver } from "@blitzjs/rpc"
import { paginate } from "blitz"
import db, { MembershipRole, Prisma, UserRole } from "db"
import { GetInstitutes } from "../validations"

export default resolver.pipe(
  resolver.zod(GetInstitutes), // TODO:
  resolver.authorize(),
  async ({ filter, skip, take }, { session: { userId, roles } }) => {
    const where: Prisma.InstituteWhereInput = {
      name: filter ? { contains: filter, mode: "insensitive" } : {},
    }

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
      query: (paginateArgs) =>
        db.institute.findMany({ ...paginateArgs, where, orderBy: { name: "asc" } }),
    })

    return {
      institutes,
      nextPage,
      hasMore,
      count,
    }
  }
)
