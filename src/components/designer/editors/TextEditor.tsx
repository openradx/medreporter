import { Stack } from "@mantine/core"
import { CodeEditor } from "./CodeEditor"
import classes from "./TextEditor.module.css"

interface TextEditorProps {
  value: string
  onChange: (value: string) => void
}

export const TextEditor = ({ value, onChange }: TextEditorProps) => (
  <Stack h="100%" w="100%" gap={0} className={classes.textEditor}>
    <CodeEditor codeType="text" extensions={[]} value={value} onChange={onChange} />
  </Stack>
)
