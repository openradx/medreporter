import { Extension } from "@codemirror/state"
import { EditorView } from "@codemirror/view"
import { Stack, useMantineColorScheme } from "@mantine/core"
import { useRef } from "react"
import { CodeType } from "~/types/general"
import { CodeMirror } from "./CodeMirror"
import { EditorToolbar } from "./EditorToolbar"

interface CodeEditorProps {
  codeType: CodeType
  extensions: Extension[]
  value: string
  onChange: (value: string) => void
}

export const CodeEditor = ({ codeType, extensions, value, onChange }: CodeEditorProps) => {
  const { colorScheme } = useMantineColorScheme()
  const valueRef = useRef(value)
  const editorRef = useRef<EditorView>(null)

  return (
    <Stack gap="xs" h="calc(100% - 32px)" style={{ flexGrow: 1 }}>
      <EditorToolbar codeType={codeType} editorRef={editorRef} />
      <CodeMirror
        theme={colorScheme === "dark" ? "dark" : "light"}
        extensions={extensions}
        value={valueRef.current}
        onChange={onChange}
        onCreateEditor={(editor) => {
          editorRef.current = editor
        }}
      />
    </Stack>
  )
}
