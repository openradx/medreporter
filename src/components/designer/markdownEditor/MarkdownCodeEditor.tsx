import { Textarea } from "@mantine/core"

interface MarkdownCodeEditorProps {
  value: string
  onChange: (value: string) => void
}

export const MarkdownCodeEditor = ({ value, onChange }: MarkdownCodeEditorProps) => (
  <Textarea value={value} onChange={(event) => onChange(event.currentTarget.value)} />
)
