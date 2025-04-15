import * as trpcNext from "@trpc/server/adapters/next"
import { fromNodeHeaders } from "better-auth/node"
import { Session } from "~/types/general"
import { auth } from "./auth"

/**
 * Inner function for `createContext` where we create the context.
 * This is useful for testing when we don't want to mock Next.js' request/response
 */
export async function createContextInner(session: Session | null) {
  return { session }
}

export type Context = Awaited<ReturnType<typeof createContextInner>>

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export async function createContext({ req }: trpcNext.CreateNextContextOptions): Promise<Context> {
  // for API-response caching see https://trpc.io/docs/caching
  const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) })

  return await createContextInner(session)
}
