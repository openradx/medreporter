import { Select, Group } from "@mantine/core"
import { ReactElement } from "react"
import { FieldOption } from "../fields/fieldTypes"

const DEFAULT_OPTIONS: FieldOption[] = []

interface SingleSelectInputProps {
  label?: string
  options?: FieldOption[]
  onChange: (value: string | null) => void
  value: string | null
  extras?: ReactElement
}

export const SingleSelectInput = ({
  label,
  onChange,
  value,
  options = DEFAULT_OPTIONS,
  extras,
}: SingleSelectInputProps) => (
  <Select
    label={
      <Group sx={{ display: "flex", flexDirection: "row", alignContent: "center" }} spacing={1}>
        {label}
        {extras}
      </Group>
    }
    value={value}
    onChange={onChange}
    data={options}
    searchable
  />
)
