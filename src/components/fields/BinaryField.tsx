import { useModule } from "~/contexts/ModuleContext"
import { useStructureController } from "~/hooks/useStructureController"
import { BinaryInput } from "../inputs/BinaryInput"
import { BaseField } from "./BaseField"
import { CommonFieldProps } from "./fieldTypes"

interface BinaryFieldProps extends CommonFieldProps<boolean> {}

export const BinaryField = ({
  id: fieldId,
  label,
  extras,
  defaultValue = false,
  disabled,
  hidden,
}: BinaryFieldProps) => {
  const { id: moduleId } = useModule()
  const { value, onChange } = useStructureController({
    moduleId,
    fieldId,
    defaultValue,
  })

  return (
    <BaseField {...{ moduleId, fieldId, label, defaultValue, value, onChange, hidden }}>
      <BinaryInput {...{ label, extras, value, onChange, disabled }} />
    </BaseField>
  )
}
