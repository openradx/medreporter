import { javascript, esLint } from "@codemirror/lang-javascript"
import { linter } from "@codemirror/lint"
import { Stack } from "@mantine/core"
import * as eslint from "eslint-linter-browserify"
import { CodeEditor } from "./CodeEditor"
import classes from "./ScriptEditor.module.css"

const extensions = [javascript(), linter(esLint(new eslint.Linter()))]

interface ScriptEditorProps {
  value: string
  onChange: (value: string) => void
}

export const ScriptEditor = ({ value, onChange }: ScriptEditorProps) => (
  <Stack h="100%" w="100%" gap={0} className={classes.scriptEditor}>
    <CodeEditor codeType="javascript" extensions={extensions} value={value} onChange={onChange} />
  </Stack>
)
