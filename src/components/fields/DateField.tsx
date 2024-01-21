import dayjs from "dayjs"
import { useGroup } from "~/contexts/GroupContext"
import { useStructureController } from "~/hooks/useStructureController"
import { DateInput } from "../inputs/DateInput"
import { BaseField } from "./BaseField"
import { CommonFieldProps } from "./fieldTypes"

interface DateFieldProps extends CommonFieldProps<string | null> {
  format?: string
}

export const DateField = ({
  id: fieldId,
  label,
  extras,
  disabled,
  hidden,
  format = "YYYY-MM-DD",
  defaultValue = null,
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
    <BaseField {...{ fieldId, label, value, onChange, hidden, format, defaultValue }}>
      <DateInput
        {...{ label, extras, disabled }}
        value={value ? new Date(value) : null}
        format={format}
        onChange={(date) => onChange(date ? date.toISOString() : null)}
      />
    </BaseField>
  )
}
