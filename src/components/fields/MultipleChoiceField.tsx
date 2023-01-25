import { useModule } from "~/contexts/ModuleContext"
import { useStructureController } from "~/hooks/useStructureController"
import { MultipleCheckboxInput } from "../inputs/MultipleCheckboxInput"
import { MultipleSelectInput } from "../inputs/MultipleSelectInput"
import { BaseField } from "./BaseField"
import { CommonFieldProps, FieldOption } from "./fieldTypes"

const DEFAULT_OPTIONS: FieldOption[] = []
const DEFAULT_VALUE: string[] = []

interface MultipleChoiceFieldProps extends CommonFieldProps<string[]> {
  variant?: "checkbox" | "select"
  options?: FieldOption[]
}

export const MultipleChoiceField = ({
  id: fieldId,
  label,
  extras,
  variant = "checkbox",
  options = DEFAULT_OPTIONS,
  defaultValue = DEFAULT_VALUE,
  visible,
  enabled,
}: MultipleChoiceFieldProps) => {
  const { id: moduleId } = useModule()
  const { value, onChange } = useStructureController({
    moduleId,
    fieldId,
    defaultValue,
  })

  return (
    <BaseField {...{ moduleId, fieldId, label, defaultValue, value, onChange, visible }}>
      {variant === "select" && (
        <MultipleSelectInput {...{ label, extras, options, value, onChange }} disabled={!enabled} />
      )}
      {variant === "checkbox" && (
        <MultipleCheckboxInput
          {...{ label, extras, options, value, onChange }}
          disabled={!enabled}
        />
      )}
    </BaseField>
  )
}
