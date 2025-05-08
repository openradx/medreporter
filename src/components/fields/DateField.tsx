import { useGroup } from "~/contexts/GroupContext"
import { useStructureController } from "~/hooks/useStructureController"
import { DateInput } from "../inputs/DateInput"
import { BaseField } from "./BaseField"
import { CommonFieldProps } from "./fieldTypes"

interface DateFieldProps extends CommonFieldProps<string | null> {
  format?: string
  width?: "auto" | "small" | "medium" | "large" | "full"
}

export const DateField = ({
  id: fieldId,
  label,
  extras,
  disabled,
  hidden,
  width,
  format,
  defaultValue = null,
}: DateFieldProps) => {
  const { value, onChange } = useStructureController({
    fieldId,
    defaultValue,
  })

  const groupDisabled = useGroup()?.disabled
  disabled = disabled || groupDisabled

  return (
    <BaseField {...{ fieldId, label, value, onChange, hidden, format, defaultValue, width }}>
      <DateInput
        {...{ label, extras, disabled }}
        value={value}
        format={format}
        onChange={onChange}
      />
    </BaseField>
  )
}
