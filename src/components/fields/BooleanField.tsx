import { useModule } from "~/contexts/ModuleContext"
import { useStructureController } from "~/hooks/useStructureController"
import { BooleanInput } from "../inputs/BooleanInput"
import { BaseField } from "./BaseField"
import { CommonFieldProps } from "./fieldTypes"

interface BooleanFieldProps extends CommonFieldProps<boolean> {}

export const BooleanField = ({
  id: fieldId,
  label,
  extras,
  defaultValue = false,
  disabled,
  hidden,
}: BooleanFieldProps) => {
  const { id: moduleId } = useModule()
  const { value, onChange } = useStructureController({
    moduleId,
    fieldId,
    defaultValue,
  })

  return (
    <BaseField {...{ moduleId, fieldId, label, defaultValue, value, onChange, hidden }}>
      <BooleanInput {...{ label, extras, value, onChange, disabled }} />
    </BaseField>
  )
}
