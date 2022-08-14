import { SecurePassword } from "@blitzjs/auth"
import { resolver } from "@blitzjs/rpc"
import db, { UserRole } from "../../../db"
import { CreateUser } from "../validations"

export default resolver.pipe(
  resolver.zod(CreateUser),
  resolver.authorize([UserRole.SUPERADMIN]),
  async ({ username, email, password, ...data }) => {
    const hashedPassword = await SecurePassword.hash(password.trim())
    return await db.user.create({
      data: {
        username: username.trim(),
        email: email.toLowerCase().trim(),
        hashedPassword,
        ...data,
      },
    })
  }
)
