import { ActionIcon } from "@mantine/core"
import type { editor as editorApi } from "monaco-editor"
import { MdPalette as PaletteIcon } from "react-icons/md"

interface PaletteButtonProps {
  editor?: editorApi.IStandaloneCodeEditor
}

export const PaletteButton = ({ editor }: PaletteButtonProps) => (
  <ActionIcon
    variant="default"
    onClick={() => {
      editor?.focus()
      editor?.trigger("", "editor.action.quickCommand", {})
    }}
  >
    <PaletteIcon />
  </ActionIcon>
)
