import { ActionIcon } from "@mantine/core"
import { MdPalette as PaletteIcon } from "react-icons/md"
import { monaco } from "react-monaco-editor"

interface PaletteButtonProps {
  editor?: monaco.editor.IStandaloneCodeEditor
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
