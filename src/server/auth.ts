import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { APIError, createAuthMiddleware } from "better-auth/api"
import { admin, customSession, username } from "better-auth/plugins"
import { SignupSchema, UsernameSchema } from "~/validations/auth"
import { prisma } from "./prisma"

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      about: { type: "string" },
    },
  },
  plugins: [
    admin(),
    username({
      usernameValidator: (username) => UsernameSchema.safeParse(username).success,
    }),
    customSession(async ({ user, session }) => {
      const foundUser = await prisma.user.findFirstOrThrow({
        where: {
          id: user.id,
        },
        include: {
          memberships: true,
        },
      })

      // Get the membership of the users current active institute
      const currentMembership = foundUser.memberships.find(
        (membership) => membership.instituteId === foundUser.currentInstituteId
      )

      return {
        user: {
          id: foundUser.id,
          email: foundUser.email,
          username: foundUser.username,
          image: foundUser.image,
          roles: currentMembership ? [foundUser.role, currentMembership.role] : [foundUser.role],
          currentInstituteId: currentMembership ? currentMembership.instituteId : null,
        },
        session,
      }
    }),
  ],
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path === "/sign-up/email") {
        if (!SignupSchema.safeParse(ctx.body))
          throw new APIError("BAD_REQUEST", { message: "Invalid signup data" })
      }
    }),
  },
})
