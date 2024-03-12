import { ActionIcon } from "@mantine/core"
import { TimeInput as MantineTimeInput } from "@mantine/dates"
import { Clock as TimeIcon } from "lucide-react"
import { ReactNode, useRef } from "react"
import { InputLabel } from "./InputLabel"

interface TimeInputProps {
  label?: string
  value: string
  onChange: (value: string) => void
  extras?: ReactNode
  disabled?: boolean
  withSeconds?: boolean
}

export const TimeInput = ({
  label,
  value,
  onChange,
  extras,
  disabled,
  withSeconds,
}: TimeInputProps) => {
  const ref = useRef<HTMLInputElement>(null)

  return (
    <MantineTimeInput
      label={(label || extras) && <InputLabel label={label} extras={extras} />}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      disabled={disabled}
      withSeconds={withSeconds}
      ref={ref}
      rightSection={
        <ActionIcon onClick={() => ref.current?.showPicker()}>
          <TimeIcon size="1rem" />
        </ActionIcon>
      }
    />
  )
}
