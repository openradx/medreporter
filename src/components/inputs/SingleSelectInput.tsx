import { Select } from "@mantine/core"
import { ReactNode } from "react"
import { Option } from "~/schemas/structure"
import { InputLabel } from "./InputLabel"

const DEFAULT_OPTIONS: Option[] = []

interface SingleSelectInputProps {
  label?: string
  extras?: ReactNode
  options?: Option[]
  value: string | null
  onChange: (value: string | null) => void
  disabled?: boolean
}

export const SingleSelectInput = ({
  label,
  extras,
  options = DEFAULT_OPTIONS,
  value,
  onChange,
  disabled,
}: SingleSelectInputProps) => (
  <Select
    label={(label || extras) && <InputLabel label={label} extras={extras} />}
    value={value}
    onChange={onChange}
    data={options}
    disabled={disabled}
    searchable
    clearable
    withinPortal
  />
)
