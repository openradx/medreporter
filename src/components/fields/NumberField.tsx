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
  min,
  max,
  precision,
  step,
  startValue,
  visible,
  enabled,
}: NumberFieldProps) => {
  const { id: moduleId } = useModule()
  const { value, onChange } = useStructureController({
    moduleId,
    fieldId,
    defaultValue,
  })
  return (
    <BaseField {...{ moduleId, fieldId, label, defaultValue, value, onChange, visible }}>
      <NumberInput
        {...{ label, extras, value, onChange, min, max, precision, step, startValue }}
        disabled={!enabled}
      />
    </BaseField>
  )
}
