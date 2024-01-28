import { markdown } from "@codemirror/lang-markdown"
import { CodeEditor } from "./CodeEditor"

const extensions = [markdown()]

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
}

export const MarkdownEditor = ({ value, onChange }: MarkdownEditorProps) => (
  <CodeEditor codeType="markdown" extensions={extensions} value={value} onChange={onChange} />
)
