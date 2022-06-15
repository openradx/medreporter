import { useModule } from "../../contexts/ModuleContext"
import { useStructureController } from "../../hooks/useStructureController"
import { DateInput } from "../inputs/DateInput"
import { BaseField } from "./BaseField"
import { CommonFieldProps } from "./fieldTypes"

interface DateFieldProps extends CommonFieldProps {
  defaultValue?: Date | null
}

export const DateField = ({
  id: fieldId,
  label,
  visible = true,
  defaultValue = new Date(),
}: DateFieldProps) => {
  const { moduleId } = useModule()
  const { value, onChange } = useStructureController({
    moduleId,
    fieldId,
    defaultValue,
  })
  return (
    <BaseField {...{ moduleId, fieldId, visible, defaultValue, value, onChange }}>
      <DateInput {...{ label, value, onChange }} />
    </BaseField>
  )
}
