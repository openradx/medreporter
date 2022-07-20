import { Select } from "@mantine/core"
import { ReactNode } from "react"
import { FieldOption } from "../fields/fieldTypes"
import { InputLabel } from "./InputLabel"

const DEFAULT_OPTIONS: FieldOption[] = []

interface SingleSelectInputProps {
  label?: string
  options?: FieldOption[]
  value: string | null
  onChange: (value: string | null) => void
  extras?: ReactNode
  disabled?: boolean
}

export const SingleSelectInput = ({
  label,
  options = DEFAULT_OPTIONS,
  value,
  onChange,
  extras,
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