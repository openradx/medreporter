import { NumberInput as MantineNumberInput } from "@mantine/core"

interface NumberInputProps {
  label?: string
  onChange: (value: number | null) => void
  value: number | null
  min?: number
  max?: number
  step?: number
  precision?: number
}

export const NumberInput = ({
  label,
  onChange,
  value,
  min = 0,
  max = 1000,
  step,
  precision = 0,
}: NumberInputProps) => (
  <MantineNumberInput
    {...{ label, min, max }}
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
