import { createRequiredContext } from "../utils/createRequiredContext"

interface StructureFormContext {
  registerDefaultValue: (instanceId: string, fieldId: string, defaultValue: any) => void
  unregisterDefaultValue: (instanceId: string, fieldId: string) => void
  clearForm: () => void
}

export const [useStructureForm, StructureFormContextProvider] =
  createRequiredContext<StructureFormContext>("StructureFormContext")
