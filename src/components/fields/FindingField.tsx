import { ReactNode } from "react"
import { useGroup } from "~/contexts/GroupContext"
import { useStructureController } from "~/hooks/useStructureController"
import { FindingInput } from "../inputs/FindingInput"
import { BaseField } from "./BaseField"
import { CommonFieldProps } from "./fieldTypes"

interface FindingFieldProps extends CommonFieldProps<boolean> {
  children: ReactNode
  direction?: "row" | "column"
}

export const FindingField = ({
  id: fieldId,
  label,
  extras,
  defaultValue = false,
  disabled,
  hidden,
  direction,
  children,
}: FindingFieldProps) => {
  const { value, onChange } = useStructureController({
    fieldId,
    defaultValue,
  })

  const groupDisabled = useGroup()?.disabled
  disabled = disabled || groupDisabled

  return (
    <BaseField {...{ fieldId, label, defaultValue, value, onChange, hidden, width: "full" }}>
      <FindingInput {...{ label, extras, value, onChange, direction, disabled, children }} />
    </BaseField>
  )
}
