import { Textarea } from "@mantine/core"

interface MarkdownCodeEditorProps {
  value: string
  onChange: (value: string) => void
}

export const MarkdownCodeEditor = ({ value, onChange }: MarkdownCodeEditorProps) => (
  <Textarea
    minRows={10}
    autosize
    value={value}
    onChange={(event) => onChange(event.currentTarget.value)}
  />
)
