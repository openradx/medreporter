import { resolver } from "@blitzjs/rpc"
import { AuthorizationError, paginate } from "blitz"
import db, { MembershipRole, Prisma, UserRole } from "db"
import { GetMemberships } from "../validations"

export default resolver.pipe(
  resolver.zod(GetMemberships),
  resolver.authorize(),
  async ({ instituteId, role, skip, take }, { session }) => {
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

    const where: Prisma.MembershipWhereInput = {
      instituteId,
      role,
    }

    const {
      items: memberships,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.membership.count({ where }),
      query: (paginateArgs) =>
        db.membership.findMany({
          ...paginateArgs,
          where,
          orderBy: { user: { username: "asc" } },
          include: { user: true },
        }),
    })

    return {
      memberships,
      nextPage,
      hasMore,
      count,
    }
  }
)
