import { markdown } from "@codemirror/lang-markdown"
import { Stack } from "@mantine/core"
import { useDebouncedCallback } from "use-debounce"
import { CodeEditor } from "./CodeEditor"
import classes from "./MarkdownEditor.module.css"

const extensions = [markdown()]

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
}

export const MarkdownEditor = ({ value, onChange }: MarkdownEditorProps) => {
  const handleChange = useDebouncedCallback(onChange, 500)

  return (
    <Stack h="100%" w="100%" gap={0} className={classes.markdownEditor}>
      <CodeEditor
        codeType="markdown"
        extensions={extensions}
        value={value}
        onChange={handleChange}
      />
    </Stack>
  )
}
