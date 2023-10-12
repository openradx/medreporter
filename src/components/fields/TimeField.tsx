import { useGroup } from "~/contexts/GroupContext"
import { useStructureController } from "~/hooks/useStructureController"
import { TimeInput } from "../inputs/TimeInput"
import { BaseField } from "./BaseField"
import { CommonFieldProps } from "./fieldTypes"

interface TimeFieldProps extends CommonFieldProps<string | null> {
  withSeconds?: boolean
}

export const TimeField = ({
  id: fieldId,
  label = "",
  extras,
  defaultValue = "",
  disabled,
  hidden,
  withSeconds,
}: TimeFieldProps) => {
  const { value, onChange } = useStructureController({
    fieldId,
    defaultValue,
  })

  const groupDisabled = useGroup()?.disabled
  disabled = disabled || groupDisabled

  return (
    <BaseField {...{ fieldId, defaultValue, value, onChange, hidden }}>
      <TimeInput {...{ label, extras, disabled, withSeconds, onChange }} value={value || ""} />
    </BaseField>
  )
}
