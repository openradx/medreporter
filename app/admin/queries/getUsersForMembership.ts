import { resolver } from "@blitzjs/rpc"
import { AuthorizationError, paginate } from "blitz"
import db, { MembershipRole, Prisma, UserRole } from "db"
import { GetUsersForMembership } from "../validations"

export default resolver.pipe(
  resolver.zod(GetUsersForMembership),
  resolver.authorize(),
  async ({ instituteId, skip = 0, take = 100 }, { session }) => {
    // Check that current user is a SUPERADMIN or OWNER / ADMIN of that institute
    if (!session.roles.includes(UserRole.SUPERADMIN)) {
      const membership = await db.membership.findFirst({
        where: {
          instituteId,
          userId: session.userId,
          role: { in: [MembershipRole.OWNER, MembershipRole.ADMIN] },
        },
      })
      if (!membership) throw new AuthorizationError()
    }

    const where: Prisma.UserWhereInput = {
      memberships: { none: { instituteId } },
    }

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
