import { useModule } from "../../contexts/ModuleContext"
import { useStructureController } from "../../hooks/useStructureController"
import { SingleRadioInput } from "../inputs/SingleRadioInput"
import { SingleSelectInput } from "../inputs/SingleSelectInput"
import { BaseField } from "./BaseField"
import { FieldOption, CommonFieldProps } from "./fieldTypes"

const DEFAULT_OPTIONS: FieldOption[] = []

interface SingleChoiceFieldProps extends CommonFieldProps {
  variant?: "radio" | "select"
  options?: FieldOption[]
  defaultValue?: string | null
}

export const SingleChoiceField = ({
  id: fieldId,
  label,
  visible = true,
  variant = "radio",
  options = DEFAULT_OPTIONS,
  defaultValue = "",
}: SingleChoiceFieldProps) => {
  const { instanceId } = useModule()
  const { value, onChange } = useStructureController({
    instanceId,
    fieldId,
    defaultValue,
  })

  return (
    <BaseField {...{ instanceId, fieldId, visible, defaultValue, value, onChange }}>
      {variant === "select" && <SingleSelectInput {...{ label, value, onChange, options }} />}
      {variant === "radio" && <SingleRadioInput {...{ label, value, onChange, options }} />}
    </BaseField>
  )
}
