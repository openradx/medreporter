import { ActionIcon } from "@mantine/core"
import { MdFormatPaint as FormatIcon } from "react-icons/md"
import { monaco } from "react-monaco-editor"

interface FormatButtonProps {
  editor?: monaco.editor.IStandaloneCodeEditor
}

export const FormatButton = ({ editor }: FormatButtonProps) => (
  <ActionIcon
    variant="default"
    onClick={() => {
      editor?.trigger("", "editor.action.formatDocument", {})
    }}
  >
    <FormatIcon />
  </ActionIcon>
)
