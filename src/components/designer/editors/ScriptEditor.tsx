import { javascript, esLint } from "@codemirror/lang-javascript"
import { linter } from "@codemirror/lint"
import { Stack } from "@mantine/core"
import { useDebouncedCallback } from "use-debounce"
import { eslintConfig, eslintLinter } from "~/utils/eslintUtils"
import { CodeEditor } from "./CodeEditor"
import classes from "./ScriptEditor.module.css"

const extensions = [javascript(), linter(esLint(eslintLinter, eslintConfig))]

interface ScriptEditorProps {
  value: string
  onChange: (value: string) => void
}

export const ScriptEditor = ({ value, onChange }: ScriptEditorProps) => {
  const handleChange = useDebouncedCallback((newValue) => {
    const messages = eslintLinter.verify(newValue, eslintConfig)
    if (!messages.some((message) => message.severity === 2)) {
      onChange(newValue)
    }
  }, 500)

  return (
    <Stack h="100%" w="100%" gap={0} className={classes.scriptEditor}>
      <CodeEditor
        codeType="javascript"
        extensions={extensions}
        value={value}
        onChange={handleChange}
      />
    </Stack>
  )
}
