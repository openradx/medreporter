import { ChoiceFieldContextProvider } from "~/contexts/ChoiceFieldContext"
import { useGroup } from "~/contexts/GroupContext"
import { useStructureController } from "~/hooks/useStructureController"
import { Option } from "~/schemas/structure"
import { MultipleCheckboxInput } from "../inputs/MultipleCheckboxInput"
import { MultipleSelectInput } from "../inputs/MultipleSelectInput"
import { BaseField } from "./BaseField"
import { CommonFieldProps } from "./fieldTypes"

const DEFAULT_OPTIONS: Option[] = []
const DEFAULT_VALUE: string[] = []

interface MultipleChoiceFieldProps extends CommonFieldProps<string[]> {
  width?: "auto" | "small" | "medium" | "large" | "full"
  variant?: "checkbox" | "select"
  options?: Option[]
}

export const MultipleChoiceField = ({
  id: fieldId,
  label,
  extras,
  variant = "checkbox",
  options = DEFAULT_OPTIONS,
  defaultValue = DEFAULT_VALUE,
  disabled,
  hidden,
  width,
}: MultipleChoiceFieldProps) => {
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
          <MultipleSelectInput {...{ label, extras, options, value, onChange, disabled }} />
        )}
        {variant === "checkbox" && (
          <MultipleCheckboxInput {...{ label, extras, options, value, onChange, disabled }} />
        )}
      </ChoiceFieldContextProvider>
    </BaseField>
  )
}
