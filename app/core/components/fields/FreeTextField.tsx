import { ReactNode } from "react"
import { useModule } from "../../contexts/ModuleContext"
import { useStructureController } from "../../hooks/useStructureController"
import { MultiLineInput } from "../inputs/MultiLineInput"
import { SingleLineInput } from "../inputs/SingleLineInput"
import { BaseField } from "./BaseField"
import { CommonFieldProps } from "./fieldTypes"

interface FreeTextFieldProps extends CommonFieldProps {
  defaultValue?: string
  multiline?: boolean
  extras?: ReactNode
}

export const FreeTextField = ({
  id: fieldId,
  label = "",
  visible = true,
  defaultValue = "",
  multiline = false,
  extras,
  disabled,
}: FreeTextFieldProps) => {
  const { id: moduleId } = useModule()
  const { value, onChange } = useStructureController({
    moduleId,
    fieldId,
    defaultValue,
  })

  return (
    <BaseField {...{ moduleId, fieldId, visible, defaultValue, value, onChange }}>
      {!multiline && <SingleLineInput {...{ label, value, onChange, extras, disabled }} />}
      {multiline && <MultiLineInput {...{ label, value, onChange, extras, disabled }} />}
    </BaseField>
  )
}
