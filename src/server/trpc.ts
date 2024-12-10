import { UserRole } from "@prisma/client"
import { initTRPC, TRPCError } from "@trpc/server"
import superjson from "superjson"
import { hasRole } from "~/utils/authorization"
import { Context } from "./context"

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape
  },
})

export const { middleware, mergeRouters, procedure: publicProcedure, router } = t

const isSuperuser = middleware(({ next, ctx }) => {
  const { user } = ctx

  if (!user) {
    throw new TRPCError({ code: "UNAUTHORIZED" })
  }

  if (!hasRole(user, [UserRole.SUPERUSER])) {
    throw new TRPCError({ code: "UNAUTHORIZED" })
  }

  return next({ ctx: { user } })
})

export const superuserProcedure = t.procedure.use(isSuperuser)

const isAdmin = middleware(({ next, ctx }) => {
  const { user } = ctx

  if (!user) {
    throw new TRPCError({ code: "UNAUTHORIZED" })
  }

  if (!hasRole(user, [UserRole.SUPERUSER, UserRole.ORGANIZER])) {
    throw new TRPCError({ code: "UNAUTHORIZED" })
  }

  return next({ ctx: { user } })
})

export const adminProcedure = t.procedure.use(isAdmin)

const isAuthed = middleware(({ next, ctx }) => {
  const { user } = ctx

  if (!user) {
    throw new TRPCError({ code: "UNAUTHORIZED" })
  }

  return next({ ctx: { user } })
})

export const authedProcedure = t.procedure.use(isAuthed)
