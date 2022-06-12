import { TextInput, Textarea } from "@mantine/core"
import { useModule } from "../../contexts/ModuleContext"
import { useStructureController } from "../../hooks/useStructureController"
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
      {variant === "singleline" && (
        <TextInput onChange={(event) => onChange(event.target.value)} {...{ label, value }} />
      )}
      {variant === "multiline" && (
        <Textarea
          autosize
          minRows={2}
          maxRows={7}
          onChange={(event) => onChange(event.target.value)}
          {...{ label, value }}
        />
      )}
    </BaseField>
  )
}
