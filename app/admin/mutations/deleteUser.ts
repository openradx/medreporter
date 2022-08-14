import { resolver } from "@blitzjs/rpc"
import db, { UserRole } from "db"
import { z } from "zod"

const DeleteUser = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(DeleteUser),
  resolver.authorize(UserRole.SUPERADMIN),
  async ({ id }) => await db.user.deleteMany({ where: { id } })
)
