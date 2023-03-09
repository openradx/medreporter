import { useModule } from "~/contexts/ModuleContext"
import { useStructureController } from "~/hooks/useStructureController"
import { SingleRadioInput } from "../inputs/SingleRadioInput"
import { SingleSelectInput } from "../inputs/SingleSelectInput"
import { BaseField } from "./BaseField"
import { CommonFieldProps, FieldOption } from "./fieldTypes"

const DEFAULT_OPTIONS: FieldOption[] = []

interface SingleChoiceFieldProps extends CommonFieldProps<string | null> {
  variant?: "radio" | "select"
  options?: FieldOption[]
}

export const SingleChoiceField = ({
  id: fieldId,
  label,
  extras,
  variant = "radio",
  options = DEFAULT_OPTIONS,
  defaultValue = null,
  disabled,
  hidden,
}: SingleChoiceFieldProps) => {
  const { id: moduleId } = useModule()
  const { value, onChange } = useStructureController({
    moduleId,
    fieldId,
    defaultValue,
  })

  return (
    <BaseField {...{ moduleId, fieldId, label, defaultValue, value, onChange, hidden }}>
      {variant === "select" && (
        <SingleSelectInput {...{ label, extras, options, value, onChange, disabled }} />
      )}
      {variant === "radio" && (
        <SingleRadioInput {...{ label, extras, options, value, onChange, disabled }} />
      )}
    </BaseField>
  )
}
