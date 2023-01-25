import { ReactNode } from "react"
import { createRequiredContext } from "~/utils/createRequiredContext"

export type ConclusionRegistryContext = {
  critical: ReactNode[]
  high: ReactNode[]
  medium: ReactNode[]
  low: ReactNode[]
}

export const [useConclusionRegistry, ConclusionRegistryContextProvider] =
  createRequiredContext<ConclusionRegistryContext>("ConclusionsRegistryContext")
