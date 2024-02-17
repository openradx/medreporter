import { Select } from "@mantine/core"
import { Controller } from "react-hook-form"
import { Option } from "~/schemas/structure"

interface SelectPropertyInputProps {
  name: string
  label: string
  data: Option[]
}
export const SelectPropertyInput = ({ name, label, data }: SelectPropertyInputProps) => (
  <Controller
    name={name}
    render={({ field: { value, onChange }, fieldState: { error } }) => (
      <Select
        label={label}
        data={data}
        value={value}
        onChange={onChange}
        error={error?.message}
        searchable
        maxDropdownHeight={100}
      />
    )}
  />
)
