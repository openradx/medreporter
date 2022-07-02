import { Textarea } from "@mantine/core"
import { ReactElement } from "react"

interface MultiLineInputProps {
  label?: string
  onChange: (value: string) => void
  value: string
  extras?: ReactElement
}

export const MultiLineInput = ({ label, onChange, value, extras }: MultiLineInputProps) => (
  <Textarea
    autosize
    autoComplete="off"
    minRows={2}
    maxRows={7}
    onChange={(event) => onChange(event.target.value)}
    {...{ label, value, extras }}
  />
)
