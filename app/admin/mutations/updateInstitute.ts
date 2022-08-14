import { resolver } from "@blitzjs/rpc"
import { AuthorizationError } from "blitz"
import db, { MembershipRole, UserRole } from "db"
import { UpdateInstitute } from "../validations"

export default resolver.pipe(
  resolver.zod(UpdateInstitute),
  resolver.authorize([UserRole.SUPERADMIN, UserRole.ORGANIZER]),
  async ({ id, ...data }, { session }) => {
    // A SUPERADMIN can update any institute
    if (session.roles.includes(UserRole.SUPERADMIN)) {
      return await db.institute.update({ where: { id }, data })
    }

    // An ORGANIZER can only update his own institutes
    const membership = await db.membership.findFirst({
      where: { userId: session.userId, instituteId: id },
    })
    if (membership?.role === MembershipRole.OWNER) {
      return await db.institute.update({ where: { id }, data })
    }

    throw new AuthorizationError()
  }
)
