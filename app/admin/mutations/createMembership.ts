import { resolver } from "@blitzjs/rpc"
import { AuthorizationError } from "blitz"
import db, { MembershipRole, UserRole } from "db"
import { CreateMembership } from "../validations"

export default resolver.pipe(
  resolver.zod(CreateMembership),
  resolver.authorize(),
  async (input, { session }) => {
    // SUPERADMIN can create any membership
    if (session.roles.includes(UserRole.SUPERADMIN)) {
      return await db.membership.create({ data: input })
    }

    // Check if current user is owner or admin of the institute
    const membership = await db.membership.findFirst({
      where: { userId: session.userId, instituteId: input.instituteId },
    })
    if (membership?.role === MembershipRole.OWNER || membership?.role === MembershipRole.ADMIN) {
      return await db.membership.create({ data: input })
    }

    throw new AuthorizationError()
  }
)
