import { ChoiceFieldContextProvider } from "~/contexts/ChoiceFieldContext"
import { useGroup } from "~/contexts/GroupContext"
import { useStructureController } from "~/hooks/useStructureController"
import { Option } from "~/schemas/structure"
import { SingleRadioInput } from "../inputs/SingleRadioInput"
import { SingleSelectInput } from "../inputs/SingleSelectInput"
import { BaseField } from "./BaseField"
import { CommonFieldProps } from "./fieldTypes"

const DEFAULT_OPTIONS: Option[] = []

interface SingleChoiceFieldProps extends CommonFieldProps<string | null> {
  variant?: "radio" | "select"
  options?: Option[]
  width?: "auto" | "small" | "medium" | "large" | "full"
}

export const SingleChoiceField = ({
  id: fieldId,
  label,
  extras,
  variant = "radio",
  options = DEFAULT_OPTIONS,
  defaultValue = null,
  disabled,
  hidden,
  width,
}: SingleChoiceFieldProps) => {
  const { value, onChange } = useStructureController({
    fieldId,
    defaultValue,
  })

  const groupDisabled = useGroup()?.disabled
  disabled = disabled || groupDisabled

  return (
    <BaseField {...{ fieldId, label, defaultValue, value, onChange, hidden, width }}>
      <ChoiceFieldContextProvider value={{ options }}>
        {variant === "select" && (
          <SingleSelectInput {...{ label, extras, options, value, onChange, disabled }} />
        )}
        {variant === "radio" && (
          <SingleRadioInput {...{ label, extras, options, value, onChange, disabled }} />
        )}
      </ChoiceFieldContextProvider>
    </BaseField>
  )
}
