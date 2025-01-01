import { router } from "../trpc"
import { adminRouter } from "./admin"
import { authRouter } from "./auth"
import { categoriesRouter } from "./categories"
import { profileRouter } from "./profile"
import { templatesRouter } from "./templates"
import { usersRouter } from "./users"

export const appRouter = router({
  admin: adminRouter,
  auth: authRouter,
  categories: categoriesRouter,
  profile: profileRouter,
  templates: templatesRouter,
  users: usersRouter,
})

export type AppRouter = typeof appRouter
