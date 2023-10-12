import { createOptionalContext } from "~/utils/createOptionalContext"

interface GroupContext {
  disabled?: boolean
}

export const [useGroup, GroupContextProvider] = createOptionalContext<GroupContext>("GroupContext")
