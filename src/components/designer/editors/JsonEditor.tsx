import { json, jsonParseLinter } from "@codemirror/lang-json"
import { linter } from "@codemirror/lint"
import { CodeEditor } from "./CodeEditor"

const extensions = [json(), linter(jsonParseLinter())]

interface JsonEditorProps {
  value: string
  onChange: (value: string) => void
}

export const JsonEditor = ({ value, onChange }: JsonEditorProps) => (
  <CodeEditor codeType="json" extensions={extensions} value={value} onChange={onChange} />
)
