import { useGroup } from "~/contexts/GroupContext"
import { useStructureController } from "~/hooks/useStructureController"
import { BooleanInput } from "../inputs/BooleanInput"
import { BaseField } from "./BaseField"
import { CommonFieldProps } from "./fieldTypes"

interface BooleanFieldProps extends CommonFieldProps<boolean> {
  width?: "auto" | "small" | "medium" | "large" | "full"
}

export const BooleanField = ({
  id: fieldId,
  label,
  extras,
  defaultValue = false,
  disabled,
  hidden,
  width,
}: BooleanFieldProps) => {
  const { value, onChange } = useStructureController({
    fieldId,
    defaultValue,
  })

  const groupDisabled = useGroup()?.disabled
  disabled = disabled || groupDisabled

  return (
    <BaseField {...{ fieldId, label, defaultValue, value, onChange, hidden, width }}>
      <BooleanInput {...{ label, extras, value, onChange, disabled }} />
    </BaseField>
  )
}
