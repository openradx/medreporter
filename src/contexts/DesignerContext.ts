import { MutableRefObject } from "react"
import { createOptionalContext } from "~/utils/createOptionalContext"

export type StructureFormRef = {
  resetField: (fieldId: string) => void
  resetAllFields: () => void
}

interface DesignerContext {
  isInsideDesigner: true
  structureFormRef: MutableRefObject<StructureFormRef | null>
}

export const [useDesigner, DesignerContextProvider] =
  createOptionalContext<DesignerContext>("DesignerContext")
