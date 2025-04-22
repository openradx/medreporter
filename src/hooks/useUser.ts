import { authClient } from "~/auth-client"
import { useServerSession } from "~/contexts/ServerSessionContext"
import type { Session } from "~/types/general"

export const useUser = (): Session["user"] | null => {
  const { session } = useServerSession()
  const { data, isPending } = authClient.useSession()

  if (isPending) {
    return session?.user ?? null
  }
  return data?.user ?? null
}
