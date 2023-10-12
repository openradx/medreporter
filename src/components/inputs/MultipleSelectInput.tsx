import { MultiSelect } from "@mantine/core"
import { ReactNode } from "react"
import { Option } from "~/schemas/structure"
import { InputLabel } from "./InputLabel"

const DEFAULT_OPTIONS: Option[] = []

interface MultipleSelectInputProps {
  label?: string
  extras?: ReactNode
  options?: Option[]
  value: string[]
  onChange: (value: string[]) => void
  disabled?: boolean
}

export const MultipleSelectInput = ({
  label,
  extras,
  options = DEFAULT_OPTIONS,
  value,
  onChange,
  disabled,
}: MultipleSelectInputProps) => (
  <MultiSelect
    label={(label || extras) && <InputLabel label={label} extras={extras} />}
    value={value}
    onChange={onChange}
    data={options}
    disabled={disabled}
    searchable
    withinPortal
  />
)
