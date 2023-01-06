import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { getCookie, setCookie } from "cookies-next"
import { randomUUID } from "crypto"
import { IncomingMessage, ServerResponse } from "http"
import type { NextApiRequest, NextApiResponse } from "next"
import NextAuth, { NextAuthOptions } from "next-auth"
import { Adapter } from "next-auth/adapters"
import { encode, decode } from "next-auth/jwt"
import CredentialsProvider from "next-auth/providers/credentials"
import { env } from "~/server/env"
import { prisma } from "~/server/prisma"
import { comparePassword } from "~/utils/cryptography"

const generateSessionToken = () => randomUUID()

const fromDate = (time: number, date = Date.now()) => new Date(date + time * 1000)

export const getAdapter = (): Adapter => ({
  ...PrismaAdapter(prisma),
  async getSessionAndUser(sessionToken) {
    const userAndSession = await prisma.session.findUnique({
      where: { sessionToken },
      include: { user: { include: { memberships: true } } },
    })

    if (!userAndSession) return null

    const { user, ...session } = userAndSession

    // Get the membership of the users current active institute
    const currentMembership = user.memberships.find(
      (membership) => membership.instituteId === user.currentInstituteId
    )

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email!, // TODO: report bug, see https://github.com/nextauthjs/next-auth/discussions/6216
        emailVerified: user.emailVerified,
        image: user.image,
        username: user.username!,
        roles: currentMembership ? [user.role, currentMembership.role] : [user.role],
        currentInstituteId: currentMembership ? currentMembership.instituteId : null,
      },
      session,
    }
  },
})

export const authOptions = (
  req: IncomingMessage,
  res: ServerResponse,
  isCredentialsCallback: boolean = false
): NextAuthOptions => {
  const adapter = getAdapter()

  return {
    adapter,
    pages: {
      signIn: "/auth/login",
    },
    jwt: {
      async encode(params) {
        if (isCredentialsCallback) {
          const cookie = getCookie("next-auth.session-token", { req, res })
          if (cookie && typeof cookie === "string") return cookie
          return ""
        }
        // Fallback to default behavior when not in the credentials provider callback flow
        return encode(params)
      },
      async decode(params) {
        if (isCredentialsCallback) {
          return null
        }
        // Fallback to default behavior when not in the credentials provider callback flow
        return decode(params)
      },
    },
    cookies: {
      sessionToken: {
        name: "next-auth.session-token",
        options: {
          httpOnly: true,
          sameSite: "lax",
          path: "/",
          secure: env.NODE_ENV === "production",
        },
      },
    },
    callbacks: {
      async signIn({ user }) {
        if (isCredentialsCallback && user) {
          const sessionToken = generateSessionToken()
          const sessionMaxAge = 60 * 60 * 24 * 30 // 30 days
          const sessionExpiry = fromDate(sessionMaxAge)

          await adapter.createSession({
            sessionToken,
            userId: user.id,
            expires: sessionExpiry,
          })

          setCookie("next-auth.session-token", sessionToken, {
            req,
            res,
            expires: sessionExpiry,
          })
        }

        return true
      },
      session({ session, user }) {
        session.user.id = user.id
        session.user.username = user.username
        session.user.roles = user.roles
        session.user.currentInstituteId = user.currentInstituteId

        return session
      },
    },
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          usernameOrEmail: {},
          password: {},
        },
        async authorize(credentials) {
          if (!credentials) return null

          const { usernameOrEmail, password } = credentials

          const username = usernameOrEmail
          const email = usernameOrEmail.toLowerCase()
          const user = await prisma.user.findFirst({
            where: { OR: [{ username }, { email }] },
            include: { memberships: true },
          })

          if (!user) return null
          if (!user.hashedPassword) return null
          if (!comparePassword(password, user.hashedPassword)) {
            return null
          }

          // Get the membership of the users current active institute
          const currentMembership = user.memberships.find(
            (membership) => membership.instituteId === user.currentInstituteId
          )

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            username: user.username!,
            roles: currentMembership ? [user.role, currentMembership.role] : [user.role],
            currentInstituteId: currentMembership ? currentMembership.instituteId : null,
          }
        },
      }),
    ],
  }
}

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const isCredentialsCallback =
    req.query.nextauth?.includes("callback") &&
    req.query.nextauth?.includes("credentials") &&
    req.method === "POST"

  return await NextAuth(req, res, authOptions(req, res, isCredentialsCallback || false))
}
