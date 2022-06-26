import { Group, NumberInput as MantineNumberInput } from "@mantine/core"
import { ReactElement } from "react"

interface NumberInputProps {
  label?: string
  onChange: (value: number | null) => void
  value: number | null
  min?: number
  max?: number
  step?: number
  precision?: number
  extras?: ReactElement
}

export const NumberInput = ({
  label,
  onChange,
  value,
  min = 0,
  max = 1000,
  step,
  precision = 0,
  extras,
}: NumberInputProps) => (
  <MantineNumberInput
    label={
      <Group sx={{ display: "flex", flexDirection: "row", alignContent: "center" }} spacing={1}>
        {label}
        {extras}
      </Group>
    }
    {...{ min, max }}
    value={value ?? undefined}
    onChange={(newValue) => onChange(newValue ?? null)}
    step={step ?? 1 / 10 ** precision}
    stepHoldDelay={300}
    stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
    precision={precision}
    styles={{
      control: {
        flexGrow: 1,
        flex: "auto",
        "&:hover": { flex: "0 0 60%" },
      },
      rightSection: { alignItems: "stretch" },
    }}
  />
)
