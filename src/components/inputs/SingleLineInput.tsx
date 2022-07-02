import { TextInput, Group } from "@mantine/core"
import { ReactElement } from "react"

interface SingleLineInputProps {
  label?: string
  onChange: (value: string) => void
  value: string
  extras?: ReactElement
}

export const SingleLineInput = ({ label, onChange, value, extras }: SingleLineInputProps) => (
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
