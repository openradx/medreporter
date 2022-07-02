import { MultiSelect } from "@mantine/core"
import { ReactElement } from "react"
import { FieldOption } from "../fields/fieldTypes"
import { InputLabel } from "./InputLabel"

const DEFAULT_OPTIONS: FieldOption[] = []

interface MultipleSelectInputProps {
  label?: string
  options?: FieldOption[]
  value: string[]
  onChange: (value: string[]) => void
  extras?: ReactElement
}

export const MultipleSelectInput = ({
  label,
  options = DEFAULT_OPTIONS,
  value,
  onChange,
  extras,
}: MultipleSelectInputProps) => (
  <MultiSelect
    label={(label || extras) && <InputLabel label={label} extras={extras} />}
    value={value}
    onChange={onChange}
    data={options}
    searchable
    withinPortal
  />
)
