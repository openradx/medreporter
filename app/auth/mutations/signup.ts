import { SecurePassword } from "@blitzjs/auth"
import { resolver } from "@blitzjs/rpc"
import db from "../../../db"
import { Signup } from "../validations"

export default resolver.pipe(
  resolver.zod(Signup),
  async ({ username, email, password, fullName, about }, ctx) => {
    const hashedPassword = await SecurePassword.hash(password.trim())
    const user = await db.user.create({
      data: {
        username: username.trim(),
        email: email.toLowerCase().trim(),
        hashedPassword,
        fullName: fullName.trim(),
        about: about.trim(),
        role: "USER",
      },
      select: { id: true, username: true, email: true, role: true },
    })

    await ctx.session.$create({
      userId: user.id,
      username: user.username,
      email: user.email,
      roles: [user.role],
      currentInstituteId: null,
    })

    return user
  }
)
