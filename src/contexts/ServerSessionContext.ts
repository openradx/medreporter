import { Session } from "~/types/general"
import { createRequiredContext } from "~/utils/createRequiredContext"

interface ServerSessionContext {
  session: Session | null
}

export const [useServerSession, ServerSessionContextProvider] =
  createRequiredContext<ServerSessionContext>("ServerSessionContext")
