import { createRequiredContext } from "~/utils/createRequiredContext"

interface SectionContext {
  id: string
  title?: string
  active: boolean
}

export const [useSection, SectionContextProvider] =
  createRequiredContext<SectionContext>("SectionContext")
