import { ReactNode } from "react"
import { createRequiredContext } from "~/utils/createRequiredContext"

export type Priority = "low" | "medium" | "high" | "critical"
export type AddConclusion = (priority: Priority, content: ReactNode) => void
export type RemoveConclusion = (priority: Priority, content: ReactNode) => void

interface ConclusionRegistrySettersContext {
  addConclusion: AddConclusion
  removeConclusion: RemoveConclusion
}

export const [useConclusionRegistrySetters, ConclusionRegistrySetterContextProvider] =
  createRequiredContext<ConclusionRegistrySettersContext>("ConclusionsRegistrySettersContext")
