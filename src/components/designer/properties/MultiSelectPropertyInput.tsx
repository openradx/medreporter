import { ComboboxData, MultiSelect } from "@mantine/core"
import { Controller } from "react-hook-form"
import { MultipleChoiceFieldNode } from "~/schemas/structure"

interface MultiSelectPropertyInputProps {
  name: string
  label: string
  node?: MultipleChoiceFieldNode
  data?: ComboboxData
  required?: boolean
}

export const MultiSelectPropertyInput = ({
  name,
  label,
  node,
  data,
  required
}: MultiSelectPropertyInputProps) => (
  <Controller
    name={name}
    render={({ field: { value, onChange }, fieldState: { error } }) => (
      <MultiSelect
        label={label}
        data={node?.options ?? data}
        value={value}
        onChange={onChange}
        error={error?.message}
        maxDropdownHeight={100}
        searchable
        clearable
        required={required}
      />
    )}
  />
)
