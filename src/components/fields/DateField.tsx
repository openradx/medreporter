import dayjs from "dayjs"
import { useModule } from "~/contexts/ModuleContext"
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

  const { id: moduleId } = useModule()
  const { value, onChange } = useStructureController({
    moduleId,
    fieldId,
    defaultValue: serializableDefaultValue,
  })

  return (
    <BaseField {...{ moduleId, fieldId, label, defaultValue, value, onChange, hidden }}>
      <DateInput
        {...{ label, extras, disabled }}
        value={value ? new Date(value) : null}
        onChange={(date) => onChange(date ? date.toISOString() : null)}
      />
    </BaseField>
  )
}
