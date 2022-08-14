import { resolver } from "@blitzjs/rpc"
import { AuthorizationError, paginate } from "blitz"
import { z } from "zod"
import db, { MembershipRole, Prisma, UserRole } from "db"

const InstituteId = z.number()

interface GetMemberships
  extends Pick<Prisma.UserFindManyArgs, "where" | "orderBy" | "skip" | "take"> {
  instituteId: z.infer<typeof InstituteId>
}

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(z.any()),
  async (
    { instituteId, where = {}, orderBy, skip = 0, take = 100 }: GetMemberships,
    { session }
  ) => {
    InstituteId.parse(instituteId)

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

    where.memberships = { none: { instituteId } }

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
