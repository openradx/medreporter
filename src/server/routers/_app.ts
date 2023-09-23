import { router } from "../trpc"
import { adminRouter } from "./admin"
import { authRouter } from "./auth"
import { profileRouter } from "./profile"
import { tagsRouter } from "./tags"

export const appRouter = router({
  admin: adminRouter,
  auth: authRouter,
  profile: profileRouter,
  tags: tagsRouter,
})

export type AppRouter = typeof appRouter
