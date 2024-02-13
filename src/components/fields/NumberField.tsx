import { useGroup } from "~/contexts/GroupContext"
import { useStructureController } from "~/hooks/useStructureController"
import { NumberInput } from "../inputs/NumberInput"
import { BaseField } from "./BaseField"
import { CommonFieldProps } from "./fieldTypes"

interface NumberFieldProps extends CommonFieldProps<number | null> {
  min?: number
  max?: number
  precision?: number
  step?: number
  start?: number
  width?: "auto" | "small" | "medium" | "large" | "full"
}

export const NumberField = ({
  id: fieldId,
  label,
  extras,
  defaultValue = null,
  disabled,
  hidden,
  width,
  min,
  max,
  precision,
  start,
  step,
}: NumberFieldProps) => {
  const { value, onChange } = useStructureController({
    fieldId,
    defaultValue,
  })

  const groupDisabled = useGroup()?.disabled
  disabled = disabled || groupDisabled

  return (
    <BaseField {...{ fieldId, label, defaultValue, value, onChange, hidden, width }}>
      <NumberInput
        {...{ label, extras, value, onChange, disabled, min, max, precision, start, step }}
      />
    </BaseField>
  )
}
