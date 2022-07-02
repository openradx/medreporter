import { Textarea } from "@mantine/core"
import { ReactElement } from "react"
import { InputLabel } from "./InputLabel"

interface MultiLineInputProps {
  label?: string
  value: string
  onChange: (value: string) => void
  extras?: ReactElement
}

export const MultiLineInput = ({ label, value, onChange, extras }: MultiLineInputProps) => (
  <Textarea
    label={(label || extras) && <InputLabel label={label} extras={extras} />}
    autosize
    autoComplete="off"
    minRows={2}
    maxRows={7}
    value={value}
    onChange={(event) => onChange(event.target.value)}
  />
)
