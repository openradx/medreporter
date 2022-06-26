import { Textarea } from "@mantine/core"
import { ReactElement } from "react"

interface MultilineInputProps {
  label?: string
  onChange: (value: string) => void
  value: string
  extras?: ReactElement
}

export const MultilineInput = ({ label, onChange, value, extras }: MultilineInputProps) => (
  <Textarea
    autosize
    autoComplete="off"
    minRows={2}
    maxRows={7}
    onChange={(event) => onChange(event.target.value)}
    {...{ label, value, extras }}
  />
)
