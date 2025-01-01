import { GetUsersSchema } from "~/validations/users"
import { prisma } from "../prisma"
import { publicProcedure, router } from "../trpc"

export const usersRouter = router({
  getUsernames: publicProcedure.input(GetUsersSchema).query(async ({ input }) => {
    const { prefix } = input

    const users = await prisma.user.findMany({
      where: {
        username: {
          startsWith: prefix,
        },
        templates: {
          some: {
            releaseStatus: "PUBLISHED",
          },
        },
      },
      orderBy: { username: "asc" },
      select: {
        username: true,
      },
    })

    return {
      users,
    }
  }),
})
