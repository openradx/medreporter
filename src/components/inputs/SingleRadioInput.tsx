import { Stack, Radio } from "@mantine/core"
import { ReactNode } from "react"
import { Option } from "~/schemas/structure"
import { InputLabel } from "./InputLabel"

const DEFAULT_OPTIONS: Option[] = []

interface SingleRadioInputProps {
  label?: string
  options?: Option[]
  extras?: ReactNode
  value: string | null
  onChange: (value: string | null) => void
  disabled?: boolean
}

export const SingleRadioInput = ({
  label,
  extras,
  options = DEFAULT_OPTIONS,
  value,
  onChange,
  disabled,
}: SingleRadioInputProps) => {
  value = value === null ? "" : value

  return (
    <Radio.Group
      label={(label || extras) && <InputLabel label={label} extras={extras} />}
      onChange={(newValue) => {
        if (!newValue) {
          onChange(null)
        } else {
          onChange(newValue)
        }
      }}
      value={value ?? undefined}
    >
      <Stack pt="xs" gap="xs">
        {options.map((option) => (
          <Radio
            key={option.value}
            value={option.value}
            label={option.label}
            onClick={() => {
              if (value === option.value) {
                onChange(null)
              }
            }}
            disabled={disabled}
          />
        ))}
      </Stack>
    </Radio.Group>
  )
}
