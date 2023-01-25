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
  visible,
  enabled,
  multiline,
}: FreeTextFieldProps) => {
  const { id: moduleId } = useModule()
  const { value, onChange } = useStructureController({
    moduleId,
    fieldId,
    defaultValue,
  })

  return (
    <BaseField {...{ moduleId, fieldId, label, visible, defaultValue, value, onChange }}>
      {!multiline && (
        <SingleLineInput {...{ label, value, onChange, extras }} disabled={!enabled} />
      )}
      {multiline && <MultiLineInput {...{ label, value, onChange, extras }} disabled={!enabled} />}
    </BaseField>
  )
}
