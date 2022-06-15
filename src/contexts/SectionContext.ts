import { createRequiredContext } from "../utils/createRequiredContext"

interface SectionContext {
  sectionId: string
}

export const [useSection, SectionContextProvider] =
  createRequiredContext<SectionContext>("SectionContext")
