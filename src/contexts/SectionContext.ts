import { createOptionalContext } from "~/utils/createOptionalContext"

interface SectionContext {
  id: string
  label: string
  active: boolean
}

export const [useSection, SectionContextProvider] =
  createOptionalContext<SectionContext>("SectionContext")
