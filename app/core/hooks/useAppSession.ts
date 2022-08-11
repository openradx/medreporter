import { useSession } from "@blitzjs/auth"
import { useInitialPublicData } from "../contexts/InitialPublicDataContext"

export const useAppSession: typeof useSession = (options = {}) => {
  const initialPublicData = useInitialPublicData()

  if (!initialPublicData) {
    throw new Error(
      "Missing initial public session data from server. " +
        "Add them to your getServerSideProps function."
    )
  }

  return useSession({ initialPublicData, ...options })
}
