import { resolver } from "@blitzjs/rpc"
import { AuthorizationError, paginate } from "blitz"
import { z } from "zod"
import db, { MembershipRole, Prisma, UserRole } from "db"

const InstituteId = z.number()
const Role = z.enum([MembershipRole.OWNER, MembershipRole.ADMIN, MembershipRole.MEMBER])

interface GetMemberships
  extends Pick<Prisma.MembershipFindManyArgs, "where" | "orderBy" | "skip" | "take"> {
  instituteId: z.infer<typeof InstituteId>
  role: z.infer<typeof Role>
}

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(z.any()),
  async (
    { instituteId, role, where = {}, orderBy, skip = 0, take = 100 }: GetMemberships,
    { session }
  ) => {
    InstituteId.parse(instituteId)
    Role.parse(role)

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

    where.instituteId = instituteId
    where.role = role

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
        db.membership.findMany({ ...paginateArgs, where, orderBy, include: { user: true } }),
    })

    return {
      memberships,
      nextPage,
      hasMore,
      count,
    }
  }
)
