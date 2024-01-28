import { Select } from "@mantine/core"
import { Controller } from "react-hook-form"
import { Option } from "~/schemas/structure"

interface SelectMetaPropertyProps {
  name: string
  label: string
  data: Option[]
}
export const SelectMetaProperty = ({ name, label, data }: SelectMetaPropertyProps) => (
  <Controller
    name={name}
    render={({ field: { value, onChange }, fieldState: { error } }) => (
      <Select label={label} data={data} value={value} onChange={onChange} error={error?.message} />
    )}
  />
)
