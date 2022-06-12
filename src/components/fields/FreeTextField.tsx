import { TextInput, Textarea } from "@mantine/core"

interface FreeTextFieldProps {
  label: string
  multiline?: boolean
}

export const FreeTextField = ({ label, multiline = false }: FreeTextFieldProps) => {
  if (multiline) {
    return <Textarea label={label} minRows={2} autosize maxRows={7} />
  }
  return <TextInput label={label} />
}
