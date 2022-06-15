import { useModule } from "../../contexts/ModuleContext"
import { useStructureController } from "../../hooks/useStructureController"
import { NumberInput } from "../inputs/NumberInput"
import { BaseField } from "./BaseField"
import { CommonFieldProps } from "./fieldTypes"

interface NumberFieldProps extends CommonFieldProps {
  defaultValue?: number | null
  min?: number
  max?: number
  precision?: number
  step?: number
}

export const NumberField = ({
  id: fieldId,
  label = "",
  visible = true,
  defaultValue = 0,
  min,
  max,
  precision,
  step,
}: NumberFieldProps) => {
  const { id: moduleId } = useModule()
  const { value, onChange } = useStructureController({
    moduleId,
    fieldId,
    defaultValue,
  })
  return (
    <BaseField {...{ moduleId, fieldId, label, visible, defaultValue, value, onChange }}>
      <NumberInput {...{ label, value, onChange, min, max, precision, step }} />
    </BaseField>
  )
}
