import { ActionIcon, Group } from "@mantine/core"
import type { editor as editorApi } from "monaco-editor"
import {
  TbZoomCode as ZoomResetIcon,
  TbZoomIn as ZoomInIcon,
  TbZoomOut as ZoomOutIcon,
} from "react-icons/tb"

interface SourceZoomButtonsProps {
  editor?: editorApi.IStandaloneCodeEditor
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
