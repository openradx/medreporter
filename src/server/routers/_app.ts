import { router } from "../trpc"
import { adminRouter } from "./admin"
import { authRouter } from "./auth"
import { categoryRouter } from "./category"
import { profileRouter } from "./profile"
import { templatesRouter } from "./templates"

export const appRouter = router({
  admin: adminRouter,
  auth: authRouter,
  category: categoryRouter,
  profile: profileRouter,
  template: templatesRouter,
})

export type AppRouter = typeof appRouter
