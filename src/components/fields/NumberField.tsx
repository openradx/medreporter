import { useModule } from "~/contexts/ModuleContext"
import { useStructureController } from "~/hooks/useStructureController"
import { NumberInput } from "../inputs/NumberInput"
import { BaseField } from "./BaseField"
import { CommonFieldProps } from "./fieldTypes"

interface NumberFieldProps extends CommonFieldProps<number | null> {
  min?: number
  max?: number
  precision?: number
  step?: number
  startValue?: number
}

export const NumberField = ({
  id: fieldId,
  label,
  extras,
  defaultValue = null,
  disabled,
  hidden,
  min,
  max,
  precision,
  step,
  startValue,
}: NumberFieldProps) => {
  const { id: moduleId } = useModule()
  const { value, onChange } = useStructureController({
    moduleId,
    fieldId,
    defaultValue,
  })
  return (
    <BaseField {...{ moduleId, fieldId, label, defaultValue, value, onChange, hidden }}>
      <NumberInput
        {...{ label, extras, value, onChange, disabled, min, max, precision, step, startValue }}
      />
    </BaseField>
  )
}
