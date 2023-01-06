import { User } from "@prisma/client"
import { TRPCError } from "@trpc/server"
import { forgotPasswordMailer } from "~/mailers/forgotPasswordMailer"
import { getAdapter } from "~/pages/api/auth/[...nextauth]"
import { checkUniqueConstraint } from "~/utils/constraints"
import { createHashedToken, hashPassword } from "~/utils/cryptography"
import { ForgotPasswordSchema, ResetPasswordSchema, SignupSchema } from "~/validations/auth"
import { prisma } from "../prisma"
import { publicProcedure, router } from "../trpc"

export const authRouter = router({
  signup: publicProcedure.input(SignupSchema).mutation(async ({ input }) => {
    const { username, email, password, fullName, about } = input
    const hashedPassword = await hashPassword(password)

    try {
      const user = await prisma.user.create({
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

      await prisma.account.create({
        data: {
          userId: user.id,
          type: "credentials",
          provider: "credentials",
          providerAccountId: user.id,
        },
      })

      return user
    } catch (error) {
      checkUniqueConstraint<User>(error, ["username", "email"])
      throw error
    }
  }),
  forgotPassword: publicProcedure.input(ForgotPasswordSchema).mutation(async ({ input }) => {
    // Adapted from generated Blitz app

    // 1. Get the user
    const user = await prisma.user.findFirst({ where: { email: input.email.toLowerCase() } })

    // 2. Generate the token and expiration date.
    const hashedToken = await createHashedToken()
    const expiresAt = new Date(Date.now() + 4 * 60 * 60 * 1000) // 4 hours

    // 3. If user with this email was found
    if (user) {
      const adapter = getAdapter()
      adapter.createVerificationToken?.({
        identifier: user.email!,
        token: hashedToken,
        expires: expiresAt,
      })

      // 4. Send the email
      await forgotPasswordMailer({ to: user.email!, token: hashedToken }).send()
    } else {
      // 7. If no user found wait the same time so attackers can't tell the difference
      // eslint-disable-next-line no-promise-executor-return
      await new Promise((resolve) => setTimeout(resolve, 750))
    }

    // 8. Return the same result whether a password reset email was sent or not
    return null
  }),
  resetPassword: publicProcedure.input(ResetPasswordSchema).mutation(async ({ input }) => {
    // Adapted from generated Blitz app

    const adapter = getAdapter()

    // 1. Try to find and delete this token in the database
    const token = await adapter.useVerificationToken?.({
      identifier: input.email,
      token: input.token,
    })

    // 2. If token not found, error
    if (!token) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid token to reset password." })
    }

    // 3. If token has expired, error
    if (token.expires < new Date()) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Reset token expired." })
    }

    // 4. Since token is valid, now we can update the user's password
    const hashedPassword = await hashPassword(input.password)
    const user = await prisma.user.update({
      where: { email: input.email },
      data: { hashedPassword },
    })

    // 5. Revoke all existing login sessions for this user
    await prisma.session.deleteMany({ where: { userId: user.id } })

    return true
  }),
})
