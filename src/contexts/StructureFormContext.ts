import { createRequiredContext } from "~/utils/createRequiredContext"

interface StructureFormContext {
  modified: boolean
  canUndo: boolean
  canRedo: boolean
  undo: () => void
  redo: () => void
  registerDefaultValue: (moduleId: string, fieldId: string, defaultValue: any) => void
  unregisterDefaultValue: (moduleId: string, fieldId: string) => void
  clearForm: () => void
}

export const [useStructureForm, StructureFormContextProvider] =
  createRequiredContext<StructureFormContext>("StructureFormContext")
