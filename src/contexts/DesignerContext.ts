import { createOptionalContext } from "~/utils/createOptionalContext"

interface DesignerContext {
  designMode: boolean
}

export const [useDesigner, DesignerContextProvider] =
  createOptionalContext<DesignerContext>("DesignerContext")
