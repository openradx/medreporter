import { inferRouterOutputs } from "@trpc/server"
import { AppRouter } from "~/server/routers/_app"

type RouterOutput = inferRouterOutputs<AppRouter>

export type ResourceWithAuthor = RouterOutput["resources"]["getResource"]
