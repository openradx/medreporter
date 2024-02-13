import { useGroup } from "~/contexts/GroupContext"
import { useStructureController } from "~/hooks/useStructureController"
import { MultiLineInput } from "../inputs/MultiLineInput"
import { SingleLineInput } from "../inputs/SingleLineInput"
import { BaseField } from "./BaseField"
import { CommonFieldProps } from "./fieldTypes"

interface FreeTextFieldProps extends CommonFieldProps<string> {
  multiline?: boolean
  grow?: boolean
  rows?: number
  minRows?: number
  maxRows?: number
  width?: "auto" | "small" | "medium" | "large" | "full"
}

export const FreeTextField = ({
  id: fieldId,
  label,
  extras,
  defaultValue = "",
  disabled,
  hidden,
  multiline = false,
  grow = true,
  rows = 3,
  minRows = 2,
  maxRows = 7,
  width,
}: FreeTextFieldProps) => {
  const { value, onChange } = useStructureController({
    fieldId,
    defaultValue,
  })

  const groupDisabled = useGroup()?.disabled
  disabled = disabled || groupDisabled

  return (
    <BaseField {...{ fieldId, label, defaultValue, value, onChange, hidden, width }}>
      {!multiline && <SingleLineInput {...{ label, extras, value, onChange, disabled }} />}
      {multiline && (
        <MultiLineInput
          {...{ label, extras, value, onChange, disabled, grow, rows, minRows, maxRows }}
        />
      )}
    </BaseField>
  )
}
