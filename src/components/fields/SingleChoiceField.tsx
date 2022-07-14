import { ReactNode } from "react"
import { useModule } from "../../contexts/ModuleContext"
import { useStructureController } from "../../hooks/useStructureController"
import { SingleRadioInput } from "../inputs/SingleRadioInput"
import { SingleSelectInput } from "../inputs/SingleSelectInput"
import { BaseField } from "./BaseField"
import { CommonFieldProps, FieldOption } from "./fieldTypes"

const DEFAULT_OPTIONS: FieldOption[] = []

interface SingleChoiceFieldProps extends CommonFieldProps {
  variant?: "radio" | "select"
  options?: FieldOption[]
  defaultValue?: string | null
  extras?: ReactNode
}

export const SingleChoiceField = ({
  id: fieldId,
  label = "",
  visible = true,
  variant = "radio",
  options = DEFAULT_OPTIONS,
  defaultValue = "",
  extras,
  disabled,
}: SingleChoiceFieldProps) => {
  const { id: moduleId } = useModule()
  const { value, onChange } = useStructureController({
    moduleId,
    fieldId,
    defaultValue,
  })

  return (
    <BaseField {...{ moduleId, fieldId, visible, defaultValue, value, onChange }}>
      {variant === "select" && (
        <SingleSelectInput {...{ label, value, onChange, options, extras, disabled }} />
      )}
      {variant === "radio" && <SingleRadioInput {...{ label, value, onChange, options, extras }} />}
    </BaseField>
  )
}