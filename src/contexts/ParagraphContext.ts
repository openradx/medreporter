import { createOptionalContext } from "~/utils/createOptionalContext"

interface ParagraphContext {
  list: boolean
}

export const [useParagraph, ParagraphContextProvider] =
  createOptionalContext<ParagraphContext>("ParagraphContext")
