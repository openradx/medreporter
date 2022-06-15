import { useModule } from "../../contexts/ModuleContext"
import { useStructureController } from "../../hooks/useStructureController"
import { MultipleCheckboxInput } from "../inputs/MultipleCheckboxInput"
import { MultipleSelectInput } from "../inputs/MultipleSelectInput"
import { BaseField } from "./BaseField"
import { FieldOption, CommonFieldProps } from "./fieldTypes"

const DEFAULT_OPTIONS: FieldOption[] = []

interface MultipleChoiceFieldProps extends CommonFieldProps {
  variant?: "checkbox" | "select"
  options?: FieldOption[]
  defaultValue?: string[]
}

export const MultipleChoiceField = ({
  id: fieldId,
  label = "",
  visible = true,
  variant = "checkbox",
  options = DEFAULT_OPTIONS,
  defaultValue = [],
}: MultipleChoiceFieldProps) => {
  const { id: moduleId } = useModule()
  const { value, onChange } = useStructureController({
    moduleId,
    fieldId,
    defaultValue,
  })

  return (
    <BaseField {...{ moduleId, fieldId, label, visible, defaultValue, value, onChange }}>
      {variant === "select" && <MultipleSelectInput {...{ label, value, onChange, options }} />}
      {variant === "checkbox" && <MultipleCheckboxInput {...{ label, value, onChange, options }} />}
    </BaseField>
  )
}
