import dayjs from "dayjs"
import { ReactNode } from "react"
import { useModule } from "~/contexts/ModuleContext"
import { useStructureController } from "~/hooks/useStructureController"
import { TimeInput } from "../inputs/TimeInput"
import { BaseField } from "./BaseField"
import { CommonFieldProps } from "./fieldTypes"

interface TimeFieldProps extends CommonFieldProps {
  defaultValue?: string | null
  extras?: ReactNode
  format?: "12" | "24"
}

export const TimeField = ({
  id: fieldId,
  label = "",
  visible = true,
  defaultValue = null,
  extras,
  disabled,
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
    <BaseField {...{ moduleId, fieldId, visible, defaultValue, value, onChange, format }}>
      <TimeInput
        label={label}
        value={value ? new Date(value) : null}
        onChange={(time) => onChange(time ? time.toISOString() : null)}
        extras={extras}
        disabled={disabled}
        format={format}
      />
    </BaseField>
  )
}
