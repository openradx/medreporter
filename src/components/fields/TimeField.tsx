import dayjs from "dayjs"
import { useModule } from "~/contexts/ModuleContext"
import { useStructureController } from "~/hooks/useStructureController"
import { TimeInput } from "../inputs/TimeInput"
import { BaseField } from "./BaseField"
import { CommonFieldProps } from "./fieldTypes"

interface TimeFieldProps extends CommonFieldProps<string | null> {
  format?: "12" | "24"
}

export const TimeField = ({
  id: fieldId,
  label = "",
  extras,
  defaultValue = null,
  disabled,
  hidden,
  format,
}: TimeFieldProps) => {
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
    <BaseField {...{ moduleId, fieldId, defaultValue, value, onChange, hidden }}>
      <TimeInput
        {...{ label, extras, disabled, format }}
        value={value ? new Date(value) : null}
        onChange={(time) => onChange(time ? time.toISOString() : null)}
      />
    </BaseField>
  )
}
