import { ReactNode } from "react"
import { useModule } from "~/contexts/ModuleContext"
import { useStructureController } from "~/hooks/useStructureController"
import { FindingInput } from "../inputs/FindingInput"
import { BaseField } from "./BaseField"
import { CommonFieldProps } from "./fieldTypes"

interface FindingFieldProps extends CommonFieldProps<boolean> {
  children: ReactNode
}

export const FindingField = ({
  id: fieldId,
  label,
  extras,
  defaultValue = false,
  disabled,
  hidden,
  children,
}: FindingFieldProps) => {
  const { id: moduleId } = useModule()
  const { value, onChange } = useStructureController({
    moduleId,
    fieldId,
    defaultValue,
  })

  return (
    <BaseField {...{ moduleId, fieldId, label, defaultValue, value, onChange, hidden }}>
      <FindingInput {...{ label, extras, value, onChange, disabled, children }} />
    </BaseField>
  )
}
