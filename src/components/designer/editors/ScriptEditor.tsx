import { javascript, esLint } from "@codemirror/lang-javascript"
import { linter } from "@codemirror/lint"
import { Stack } from "@mantine/core"
import * as eslint from "eslint-linter-browserify"
import { useDebouncedCallback } from "use-debounce"
import { CodeEditor } from "./CodeEditor"
import classes from "./ScriptEditor.module.css"

const eslintLinter = new eslint.Linter()
const config: eslint.Linter.Config = {
  parserOptions: { ecmaVersion: 2020, sourceType: "script" },
  env: { es2020: true },
  globals: { fields: "readonly" },
  rules: {
    semi: ["error", "never"],
  },
}
eslintLinter.getRules().forEach((desc: any, name: string) => {
  if (desc.meta.docs.recommended) config.rules![name] = 2
})

const extensions = [javascript(), linter(esLint(eslintLinter, config))]

interface ScriptEditorProps {
  value: string
  onChange: (value: string) => void
}

export const ScriptEditor = ({ value, onChange }: ScriptEditorProps) => {
  const handleChange = useDebouncedCallback((newValue) => {
    const messages = eslintLinter.verify(newValue, config)
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
