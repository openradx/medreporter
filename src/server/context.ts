import * as trpc from "@trpc/server"
import * as trpcNext from "@trpc/server/adapters/next"
import { User } from "next-auth"
import { getServerSideSession } from "~/server/utils/sessionUtils"

/**
 * Inner function for `createContext` where we create the context.
 * This is useful for testing when we don't want to mock Next.js' request/response
 */
export async function createContextInner(user: User | null) {
  return { user }
}

export type Context = trpc.inferAsyncReturnType<typeof createContextInner>

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export async function createContext({
  req,
  res,
}: trpcNext.CreateNextContextOptions): Promise<Context> {
  // for API-response caching see https://trpc.io/docs/caching
  const session = await getServerSideSession(req, res)

  return await createContextInner(session?.user ?? null)
}
