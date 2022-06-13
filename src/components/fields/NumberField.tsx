import { NumberInput } from "@mantine/core"

interface NumberFieldProps {
  label: string
  min?: number
  max?: number
  step?: number
  precision?: number
}

export const NumberField = ({
  label,
  min = 0,
  max = 1000,
  step,
  precision = 0,
}: NumberFieldProps) => {
  let stepInterval: number
  if (step) {
    stepInterval = step
  } else {
    stepInterval = 1 / 10 ** precision
  }
  return (
    <NumberInput
      label={label}
      min={min}
      max={max}
      stepHoldDelay={500}
      step={stepInterval}
      stepHoldInterval={stepInterval}
      precision={precision}
    />
  )
}
