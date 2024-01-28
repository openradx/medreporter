import { javascript, esLint } from "@codemirror/lang-javascript"
import { linter } from "@codemirror/lint"
import * as eslint from "eslint-linter-browserify"
import { CodeEditor } from "./CodeEditor"

const extensions = [javascript(), linter(esLint(new eslint.Linter()))]

interface ScriptEditorProps {
  value: string
  onChange: (value: string) => void
}

export const ScriptEditor = ({ value, onChange }: ScriptEditorProps) => (
  <CodeEditor codeType="javascript" extensions={extensions} value={value} onChange={onChange} />
)
