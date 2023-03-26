import { ActionIcon } from "@mantine/core"
import { TimeInput as MantineTimeInput } from "@mantine/dates"
import { ReactNode, useRef } from "react"
import { FiClock } from "react-icons/fi"
import { InputLabel } from "./InputLabel"

interface TimeInputProps {
  label?: string
  value: string
  onChange: (value: string) => void
  extras?: ReactNode
  disabled?: boolean
  accuracy?: "minutes" | "seconds"
}

export const TimeInput = ({
  label,
  value,
  onChange,
  extras,
  disabled,
  accuracy,
}: TimeInputProps) => {
  const ref = useRef<HTMLInputElement>(null)

  return (
    <MantineTimeInput
      label={(label || extras) && <InputLabel label={label} extras={extras} />}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      disabled={disabled}
      withSeconds={accuracy === "seconds"}
      ref={ref}
      rightSection={
        <ActionIcon onClick={() => ref.current?.showPicker()}>
          <FiClock size="1rem" />
        </ActionIcon>
      }
    />
  )
}