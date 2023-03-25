import { useModule } from "~/contexts/ModuleContext"
import { useStructureController } from "~/hooks/useStructureController"
import { TimeInput } from "../inputs/TimeInput"
import { BaseField } from "./BaseField"
import { CommonFieldProps } from "./fieldTypes"

interface TimeFieldProps extends CommonFieldProps<string | null> {
  accuracy?: "minutes" | "seconds"
}

export const TimeField = ({
  id: fieldId,
  label = "",
  extras,
  defaultValue = "",
  disabled,
  hidden,
  accuracy = "minutes",
}: TimeFieldProps) => {
  const { id: moduleId } = useModule()
  const { value, onChange } = useStructureController({
    moduleId,
    fieldId,
    defaultValue,
  })

  return (
    <BaseField {...{ moduleId, fieldId, defaultValue, value, onChange, hidden }}>
      <TimeInput {...{ label, extras, disabled, accuracy, onChange }} value={value || ""} />
    </BaseField>
  )
}
