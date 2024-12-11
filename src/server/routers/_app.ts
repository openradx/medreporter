import { router } from "../trpc"
import { adminRouter } from "./admin"
import { authRouter } from "./auth"
import { categoriesRouter } from "./categories"
import { profileRouter } from "./profile"
import { templatesRouter } from "./templates"

export const appRouter = router({
  admin: adminRouter,
  auth: authRouter,
  categories: categoriesRouter,
  profile: profileRouter,
  templates: templatesRouter,
})

export type AppRouter = typeof appRouter
