import { javascript, esLint } from "@codemirror/lang-javascript"
import { linter } from "@codemirror/lint"
import { Stack } from "@mantine/core"
import { config, eslintLinter } from "~/utils/linting"
import { CodeEditor } from "./CodeEditor"
import classes from "./ScriptEditor.module.css"

const extensions = [javascript(), linter(esLint(eslintLinter, config))]

interface ScriptEditorProps {
  value: string
  onChange: (value: string) => void
}

export const ScriptEditor = ({ value, onChange }: ScriptEditorProps) => (
  <Stack h="100%" w="100%" gap={0} className={classes.scriptEditor}>
    <CodeEditor codeType="script" extensions={extensions} value={value} onChange={onChange} />
  </Stack>
)
