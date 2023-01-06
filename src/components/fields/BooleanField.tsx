import { ReactNode } from "react"
import { useModule } from "~/contexts/ModuleContext"
import { useStructureController } from "~/hooks/useStructureController"
import { BooleanInput } from "../inputs/BooleanInput"
import { BaseField } from "./BaseField"
import { CommonFieldProps } from "./fieldTypes"

interface BooleanFieldProps extends CommonFieldProps {
  defaultValue?: boolean
  extras?: ReactNode
}

export const BooleanField = ({
  id: fieldId,
  label = "",
  visible = true,
  defaultValue = false,
  extras,
  disabled,
}: BooleanFieldProps) => {
  const { id: moduleId } = useModule()
  const { value, onChange } = useStructureController({
    moduleId,
    fieldId,
    defaultValue,
  })

  return (
    <BaseField {...{ moduleId, fieldId, visible, defaultValue, value, onChange }}>
      <BooleanInput {...{ label, value, onChange, extras, disabled }} />
    </BaseField>
  )
}
