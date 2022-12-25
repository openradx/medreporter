import { Box, Divider, Group } from "@mantine/core"
import { monaco } from "react-monaco-editor"
import { FormatButton } from "./FormatButton"
import { PaletteButton } from "./PaletteButton"
import { SourceZoomButtons } from "./SourceZoomButtons"
import { UndoRedoButtons } from "./UndoRedoButtons"

interface SourceEditorToolbarProps {
  editor?: monaco.editor.IStandaloneCodeEditor
}

export const SourceEditorToolbar = ({ editor }: SourceEditorToolbarProps) => (
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
      <SourceZoomButtons editor={editor} />
      <Divider orientation="vertical" sx={{ height: 24 }} />
      <PaletteButton editor={editor} />
    </Group>
  </Box>
)
