import { createOptionalContext } from "~/utils/createOptionalContext"

interface DesignerContext {
  isInsideDesigner: true
}

export const [useDesigner, DesignerContextProvider] =
  createOptionalContext<DesignerContext>("DesignerContext")
