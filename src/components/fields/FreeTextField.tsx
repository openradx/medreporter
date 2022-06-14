import { useModule } from "../../contexts/ModuleContext"
import { useStructureController } from "../../hooks/useStructureController"
import { MultilineInput } from "../inputs/MultilineInput"
import { SinglelineInput } from "../inputs/SinglelineInput"
import { BaseField } from "./BaseField"
import { CommonFieldProps } from "./fieldTypes"

interface FreeTextFieldProps extends CommonFieldProps {
  defaultValue?: string
  variant?: "singleline" | "multiline"
}

export const FreeTextField = ({
  id: fieldId,
  label,
  visible = true,
  defaultValue = "",
  variant = "singleline",
}: FreeTextFieldProps) => {
  const { instanceId } = useModule()
  const { value, onChange } = useStructureController({
    instanceId,
    fieldId,
    defaultValue,
  })

  return (
    <BaseField {...{ instanceId, fieldId, visible, defaultValue, value, onChange }}>
      {variant === "singleline" && <SinglelineInput {...{ label, value, onChange }} />}
      {variant === "multiline" && <MultilineInput {...{ label, value, onChange }} />}
    </BaseField>
  )
}
