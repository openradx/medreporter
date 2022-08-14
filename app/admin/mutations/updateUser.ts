import { SecurePassword } from "@blitzjs/auth"
import { resolver } from "@blitzjs/rpc"
import db, { UserRole } from "db"
import { UpdateUser } from "../validations"

export default resolver.pipe(
  resolver.zod(UpdateUser),
  resolver.authorize(UserRole.SUPERADMIN),
  async ({ id, email, password, role }) => {
    if (!id) {
      throw new Error("Missing user ID to update user.")
    }

    const data: any = { email: email.toLowerCase().trim(), role }

    if (password?.trim()) {
      data.hashedPassword = await SecurePassword.hash(password.trim())
    }

    return await db.user.update({
      where: { id },
      data,
    })
  }
)
