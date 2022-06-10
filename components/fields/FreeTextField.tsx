import { TextInput } from "@mantine/core"

interface FreeTextFieldProps {
  label: string
}

export const FreeTextField = ({ label }: FreeTextFieldProps) => <TextInput label={label} />
