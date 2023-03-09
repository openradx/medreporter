import { useModule } from "~/contexts/ModuleContext"
import { useStructureController } from "~/hooks/useStructureController"
import { MultiLineInput } from "../inputs/MultiLineInput"
import { SingleLineInput } from "../inputs/SingleLineInput"
import { BaseField } from "./BaseField"
import { CommonFieldProps } from "./fieldTypes"

interface FreeTextFieldProps extends CommonFieldProps<string> {
  multiline?: boolean
}

export const FreeTextField = ({
  id: fieldId,
  label,
  extras,
  defaultValue = "",
  disabled,
  hidden,
  multiline,
}: FreeTextFieldProps) => {
  const { id: moduleId } = useModule()
  const { value, onChange } = useStructureController({
    moduleId,
    fieldId,
    defaultValue,
  })

  return (
    <BaseField {...{ moduleId, fieldId, label, defaultValue, value, onChange, hidden }}>
      {!multiline && <SingleLineInput {...{ label, extras, value, onChange, disabled }} />}
      {multiline && <MultiLineInput {...{ label, extras, value, onChange, disabled }} />}
    </BaseField>
  )
}
