import { Session } from "@blitzjs/auth"
import { createRequiredContext } from "../utils/createRequiredContext"

export const [useInitialPublicData, InitialPublicDataContextProvider] = createRequiredContext<
  Session["PublicData"]
>("InitialPublicDataContext")
