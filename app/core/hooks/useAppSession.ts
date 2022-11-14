import { useSession } from "@blitzjs/auth"
import { useInitialPublicData } from "../contexts/InitialPublicDataContext"

export const useAppSession: typeof useSession = (options = {}) => {
  const initialPublicData = useInitialPublicData()

  if (!initialPublicData) {
    // A warning that occurs when initial session data was not provided
    // in getServerSideProps function.
    // eslint-disable-next-line no-console
    console.warn("No initial public session data from server.")
  }

  return useSession({ initialPublicData, ...options })
}
