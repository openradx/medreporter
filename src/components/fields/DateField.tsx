import dayjs from "dayjs"
import { useGroup } from "~/contexts/GroupContext"
import { useStructureController } from "~/hooks/useStructureController"
import { DateInput } from "../inputs/DateInput"
import { BaseField } from "./BaseField"
import { CommonFieldProps } from "./fieldTypes"

interface DateFieldProps extends CommonFieldProps<string | null> {}

export const DateField = ({
  id: fieldId,
  label,
  extras,
  defaultValue = null,
  disabled,
  hidden,
}: DateFieldProps) => {
  let serializableDefaultValue: string | null = null
  if (defaultValue) {
    serializableDefaultValue = dayjs(defaultValue).toISOString()
  }

  const { value, onChange } = useStructureController({
    fieldId,
    defaultValue: serializableDefaultValue,
  })

  const groupDisabled = useGroup()?.disabled
  disabled = disabled || groupDisabled

  return (
    <BaseField {...{ fieldId, label, defaultValue, value, onChange, hidden }}>
      <DateInput
        {...{ label, extras, disabled }}
        value={value ? new Date(value) : null}
        onChange={(date) => onChange(date ? date.toISOString() : null)}
      />
    </BaseField>
  )
}
