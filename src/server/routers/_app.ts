import { publicProcedure, router } from "../trpc"
import { adminRouter } from "./admin"
import { authRouter } from "./auth"
import { commonRouter } from "./common"

export const appRouter = router({
  healthcheck: publicProcedure.query(() => "yay!"),
  admin: adminRouter,
  auth: authRouter,
  common: commonRouter,
})

export type AppRouter = typeof appRouter
