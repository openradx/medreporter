import { publicProcedure, router } from "../trpc"
import { adminRouter } from "./admin"
import { authRouter } from "./auth"
import { categoriesRouter } from "./categories"
import { profileRouter } from "./profile"
import { resourcesRouter } from "./resources"

export const appRouter = router({
  healthcheck: publicProcedure.query(() => "yay!"),
  admin: adminRouter,
  auth: authRouter,
  categories: categoriesRouter,
  profile: profileRouter,
  resources: resourcesRouter,
})

export type AppRouter = typeof appRouter
