import { ActionIcon } from "@mantine/core"
import type { editor as editorApi } from "monaco-editor"
import { MdFormatPaint as FormatIcon } from "react-icons/md"

interface FormatButtonProps {
  editor?: editorApi.IStandaloneCodeEditor
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
