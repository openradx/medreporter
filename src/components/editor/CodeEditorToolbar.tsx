import { Box, Divider, Group } from "@mantine/core"
import type { editor as editorApi } from "monaco-editor"
import { CodeEditorZoomButtons } from "./CodeEditorZoomButtons"
import { FormatButton } from "./FormatButton"
import { PaletteButton } from "./PaletteButton"
import { UndoRedoButtons } from "./UndoRedoButtons"

interface SourceEditorToolbarProps {
  editor?: editorApi.IStandaloneCodeEditor
}

export const CodeEditorToolbar = ({ editor }: SourceEditorToolbarProps) => (
  <Box
    sx={(theme) => ({
      borderBottom: `1px solid ${
        theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[2]
      }`,
      padding: 8,
    })}
  >
    <Group spacing="sm">
      <UndoRedoButtons editor={editor} />
      <Divider orientation="vertical" sx={{ height: 24 }} />
      <FormatButton editor={editor} />
      <Divider orientation="vertical" sx={{ height: 24 }} />
      <CodeEditorZoomButtons editor={editor} />
      <Divider orientation="vertical" sx={{ height: 24 }} />
      <PaletteButton editor={editor} />
    </Group>
  </Box>
)
