import { xml } from "@codemirror/lang-xml"
import { Stack } from "@mantine/core"
import { useDebouncedCallback } from "use-debounce"
import { CodeEditor } from "./CodeEditor"
import classes from "./SvgEditor.module.css"

const extensions = [xml()]

interface SvgEditorProps {
  value: string
  onChange: (value: string) => void
}

export const SvgEditor = ({ value, onChange }: SvgEditorProps) => {
  const handleChange = useDebouncedCallback(onChange, 500)

  return (
    <Stack h="100%" w="100%" gap={0} className={classes.svgEditor}>
      <CodeEditor codeType="svg" extensions={extensions} value={value} onChange={handleChange} />
    </Stack>
  )
}
