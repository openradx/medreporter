import { TRPCError } from "@trpc/server"
import { UpdateCurrentInstituteSchema } from "~/validations/profile"
import { prisma } from "../prisma"
import { authedProcedure, router } from "../trpc"

export const profileRouter = router({
  getOwnMemberships: authedProcedure.query(async ({ ctx }) => {
    const { session } = ctx

    const memberships = await prisma.membership.findMany({
      where: { userId: session.user.id },
      include: { institute: true },
    })

    return memberships
  }),
  updateCurrentInstitute: authedProcedure
    .input(UpdateCurrentInstituteSchema)
    .mutation(async ({ input, ctx }) => {
      const { instituteId } = input
      const { session } = ctx

      if (instituteId) {
        const membership = await prisma.membership.findUnique({
          where: { instituteId_userId: { instituteId, userId: session.user.id } },
        })
        if (!membership) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Not a valid member of this institute.",
          })
        }
      }

      return await prisma.user.update({
        data: { currentInstituteId: instituteId },
        where: { id: session.user.id },
        select: { id: true },
      })
    }),
})
