import { TextInput, Textarea } from "@mantine/core"

interface FreeTextFieldProps {
  label: string
  variant?: "singleline" | "multiline"
}

export const FreeTextField = ({ variant = "singleline", ...rest }: FreeTextFieldProps) => {
  if (variant === "multiline") {
    return <Textarea autosize minRows={2} maxRows={7} {...rest} />
  }
  return <TextInput {...rest} />
}
