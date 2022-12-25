import { ActionIcon, Group } from "@mantine/core"
import {
  TbZoomCode as ZoomResetIcon,
  TbZoomIn as ZoomInIcon,
  TbZoomOut as ZoomOutIcon,
} from "react-icons/tb"
import { monaco } from "react-monaco-editor"

interface SourceZoomButtonsProps {
  editor?: monaco.editor.IStandaloneCodeEditor
}

export const SourceZoomButtons = ({ editor }: SourceZoomButtonsProps) => (
  <Group spacing={8}>
    <ActionIcon
      variant="default"
      onClick={() => {
        editor?.trigger("", "editor.action.fontZoomOut", {})
      }}
    >
      <ZoomOutIcon />
    </ActionIcon>
    <ActionIcon
      variant="default"
      onClick={() => {
        editor?.trigger("", "editor.action.fontZoomReset", {})
      }}
    >
      <ZoomResetIcon />
    </ActionIcon>
    <ActionIcon
      variant="default"
      onClick={() => {
        editor?.trigger("", "editor.action.fontZoomIn", {})
      }}
    >
      <ZoomInIcon />
    </ActionIcon>
  </Group>
)
