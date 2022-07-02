import { TextInput } from "@mantine/core"
import { ReactElement } from "react"
import { InputLabel } from "./InputLabel"

interface SingleLineInputProps {
  label?: string
  value: string
  onChange: (value: string) => void
  extras?: ReactElement
}

export const SingleLineInput = ({ label, value, onChange, extras }: SingleLineInputProps) => (
  <TextInput
    autoComplete="off"
    onChange={(event) => onChange(event.target.value)}
    label={(label || extras) && <InputLabel label={label} extras={extras} />}
    {...{ value }}
  />
)
