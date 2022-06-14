import { Textarea } from "@mantine/core"

interface MultilineInputProps {
  label?: string
  onChange: (value: string) => void
  value: string
}

export const MultilineInput = ({ label, onChange, value }: MultilineInputProps) => (
  <Textarea
    autosize
    autoComplete="off"
    minRows={2}
    maxRows={7}
    onChange={(event) => onChange(event.target.value)}
    {...{ label, value }}
  />
)
