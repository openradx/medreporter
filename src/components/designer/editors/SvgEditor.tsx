import { xml } from "@codemirror/lang-xml"
import { CodeEditor } from "./CodeEditor"

const extensions = [xml()]

interface SvgEditorProps {
  value: string
  onChange: (value: string) => void
}

export const SvgEditor = ({ value, onChange }: SvgEditorProps) => (
  <CodeEditor codeType="svg" extensions={extensions} value={value} onChange={onChange} />
)
