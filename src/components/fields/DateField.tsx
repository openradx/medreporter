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
  const { instanceId } = useModule()
  const { value, onChange } = useStructureController({
    instanceId,
    fieldId,
    defaultValue,
  })
  return (
    <BaseField {...{ instanceId, fieldId, visible, defaultValue, value, onChange }}>
      <DateInput {...{ label, value, onChange }} />
    </BaseField>
  )
}
