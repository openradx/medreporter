import { SecurePassword } from "@blitzjs/auth"
import { resolver } from "@blitzjs/rpc"
import { AuthenticationError } from "blitz"
import db from "db"
import { Login } from "../validations"

export const authenticateUser = async (rawUsernameOrEmail: string, rawPassword: string) => {
  const { usernameOrEmail, password } = Login.parse({
    usernameOrEmail: rawUsernameOrEmail,
    password: rawPassword,
  })
  const username = usernameOrEmail
  const email = usernameOrEmail.toLowerCase()
  const user = await db.user.findFirst({
    where: { OR: [{ username }, { email }] },
    include: { memberships: true },
  })
  if (!user) throw new AuthenticationError()

  const result = await SecurePassword.verify(user.hashedPassword, password)

  if (result === SecurePassword.VALID_NEEDS_REHASH) {
    // Upgrade hashed password with a more secure hash
    const improvedHash = await SecurePassword.hash(password)
    await db.user.update({ where: { id: user.id }, data: { hashedPassword: improvedHash } })
  }

  const { hashedPassword, ...rest } = user
  return rest
}

export default resolver.pipe(resolver.zod(Login), async ({ usernameOrEmail, password }, ctx) => {
  // This throws an error if credentials are invalid
  const user = await authenticateUser(usernameOrEmail, password)

  // Get the membership of the users current active institute
  const currentMembership = user.memberships.find(
    (membership) => membership.instituteId === user.currentInstituteId
  )

  await ctx.session.$create({
    userId: user.id,
    username: user.username,
    email: user.email,
    roles: currentMembership ? [user.role, currentMembership.role] : [user.role],
    currentInstituteId: currentMembership ? currentMembership.instituteId : null,
  })

  return user
})
