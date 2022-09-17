import { resolver } from "@blitzjs/rpc"
import db, { UserRole } from "db"
import { DeleteUser } from "../validations"

export default resolver.pipe(
  resolver.zod(DeleteUser),
  resolver.authorize(UserRole.SUPERADMIN),
  async ({ id }) => await db.user.deleteMany({ where: { id } })
)
