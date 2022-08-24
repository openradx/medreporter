import { Box, Divider, Group } from "@mantine/core"
import { monaco } from "react-monaco-editor"
import { CodeZoomButtons } from "./CodeZoomButtons"
import { FormatButton } from "./FormatButton"
import { PaletteButton } from "./PaletteButton"
import { UndoRedoButtons } from "./UndoRedoButtons"

interface CodeEditorToolbarProps {
  editor?: monaco.editor.IStandaloneCodeEditor
}

export const CodeEditorToolbar = ({ editor }: CodeEditorToolbarProps) => (
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
      <CodeZoomButtons editor={editor} />
      <Divider orientation="vertical" sx={{ height: 24 }} />
      <PaletteButton editor={editor} />
    </Group>
  </Box>
)
