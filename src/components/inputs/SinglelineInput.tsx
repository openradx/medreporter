import { TextInput } from "@mantine/core"

interface SinglelineInputProps {
  label?: string
  onChange: (value: string) => void
  value: string
}

export const SinglelineInput = ({ label, onChange, value }: SinglelineInputProps) => (
  <TextInput
    autoComplete="off"
    onChange={(event) => onChange(event.target.value)}
    {...{ label, value }}
  />
)
