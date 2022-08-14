import { resolver } from "@blitzjs/rpc"
import { AuthorizationError, NotFoundError } from "blitz"
import { z } from "zod"
import db, { MembershipRole, UserRole } from "db"

const DeleteMembership = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(DeleteMembership),
  resolver.authorize(),
  async ({ id }, { session }) => {
    // SUPERADMIN can delete any membership
    if (session.roles.includes(UserRole.SUPERADMIN)) {
      return await db.membership.deleteMany({ where: { id } })
    }

    // Only an owner or admin of the institute can delete memberships of this institute
    const membershipToDelete = await db.membership.findFirst({ where: { id } })
    if (!membershipToDelete) throw new NotFoundError()

    const membershipOfUser = await db.membership.findFirst({
      where: {
        userId: session.userId,
        instituteId: membershipToDelete.instituteId,
      },
    })
    if (
      membershipOfUser?.role === MembershipRole.OWNER ||
      membershipOfUser?.role === MembershipRole.ADMIN
    ) {
      return await db.membership.deleteMany({ where: { id } })
    }

    throw new AuthorizationError()
  }
)
