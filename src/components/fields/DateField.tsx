import dayjs from "dayjs"
import { ReactNode } from "react"
import { useModule } from "../../contexts/ModuleContext"
import { useStructureController } from "../../hooks/useStructureController"
import { DateInput } from "../inputs/DateInput"
import { BaseField } from "./BaseField"
import { CommonFieldProps } from "./fieldTypes"

interface DateFieldProps extends CommonFieldProps {
  defaultValue?: string | null
  extras?: ReactNode
}

export const DateField = ({
  id: fieldId,
  label = "",
  visible = true,
  defaultValue = null,
  extras,
  disabled,
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
    <BaseField {...{ moduleId, fieldId, visible, defaultValue, value, onChange }}>
      <DateInput
        label={label}
        value={value ? new Date(value) : null}
        onChange={(date) => onChange(date ? date.toISOString() : null)}
        extras={extras}
        disabled={disabled}
      />
    </BaseField>
  )
}
