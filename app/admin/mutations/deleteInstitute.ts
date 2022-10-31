import { resolver } from "@blitzjs/rpc"
import { AuthorizationError } from "blitz"
import db, { MembershipRole, UserRole } from "db"
import { DeleteInstitute } from "../validations"

export default resolver.pipe(
  resolver.zod(DeleteInstitute),
  resolver.authorize([UserRole.SUPERADMIN, UserRole.ORGANIZER]),
  async ({ id }, { session }) => {
    // A SUPERADMIN can delete any institute
    if (session.roles.includes(UserRole.SUPERADMIN)) {
      return await db.institute.deleteMany({ where: { id } })
    }

    // An ORGANIZER can only delete his own institutes
    const membership = await db.membership.findFirst({
      where: { userId: session.userId, instituteId: id },
    })
    if (membership?.role === MembershipRole.OWNER) {
      return await db.institute.deleteMany({ where: { id } })
    }

    // TODO: check that memberships are deleted on CASCADE

    throw new AuthorizationError()
  }
)
