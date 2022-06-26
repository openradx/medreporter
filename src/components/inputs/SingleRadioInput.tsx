import { Radio, Group } from "@mantine/core"
import { ReactElement } from "react"
import { FieldOption } from "../fields/fieldTypes"

const DEFAULT_OPTIONS: FieldOption[] = []

interface SingleRadioInputProps {
  label?: string
  options?: FieldOption[]
  onChange: (value: string) => void
  value: string | null
  extras?: ReactElement
}

export const SingleRadioInput = ({
  label,
  value,
  onChange,
  options = DEFAULT_OPTIONS,
  extras,
}: SingleRadioInputProps) => (
  <Radio.Group
    label={
      <Group sx={{ display: "flex", flexDirection: "row", alignContent: "center" }} spacing={1}>
        {label}
        {extras}
      </Group>
    }
    onChange={onChange}
    value={value ?? undefined}
    orientation="vertical"
    spacing="xs"
  >
    {options.map((option) => (
      <Radio key={option.value} value={option.value} label={option.label} />
    ))}
  </Radio.Group>
)
