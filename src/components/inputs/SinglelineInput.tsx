import { TextInput, Group } from "@mantine/core"
import { ReactElement } from "react"

interface SinglelineInputProps {
  label?: string
  onChange: (value: string) => void
  value: string
  extras?: ReactElement
}

export const SinglelineInput = ({ label, onChange, value, extras }: SinglelineInputProps) => (
  <TextInput
    autoComplete="off"
    onChange={(event) => onChange(event.target.value)}
    label={
      <Group sx={{ display: "flex", flexDirection: "row", alignContent: "center" }} spacing={1}>
        {label}
        {extras}
      </Group>
    }
    {...{ value }}
  />
)
