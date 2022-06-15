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
}: NumberInputProps) => {
  let stepInterval: number
  if (step) {
    stepInterval = step
  } else {
    stepInterval = 1 / 10 ** precision
  }

  return (
    <MantineNumberInput
      {...{ label, min, max }}
      value={value ?? undefined}
      onChange={(newValue) => onChange(newValue ?? null)}
      stepHoldDelay={500}
      step={stepInterval}
      stepHoldInterval={stepInterval}
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
}
