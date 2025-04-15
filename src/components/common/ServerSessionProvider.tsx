import { ServerSessionContextProvider } from "~/contexts/ServerSessionContext"
import { Session } from "~/types/general"

interface SessionProviderProps {
  session: Session | null
  children: React.ReactNode
}

export const ServerSessionProvider = ({ session, children }: SessionProviderProps) => (
  <ServerSessionContextProvider value={{ session }}>{children}</ServerSessionContextProvider>
)
