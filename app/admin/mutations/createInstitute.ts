import { resolver } from "@blitzjs/rpc"
import db, { MembershipRole, UserRole } from "db"
import { CreateInstitute } from "../validations"

export default resolver.pipe(
  resolver.zod(CreateInstitute),
  resolver.authorize([UserRole.SUPERADMIN, UserRole.ORGANIZER]),
  async ({ name }, { session }) => {
    const institute = await db.institute.create({
      data: {
        name,
        memberships: {
          create: [
            {
              userId: session.userId,
              role: MembershipRole.OWNER,
            },
          ],
        },
      },
    })
    return institute
  }
)
