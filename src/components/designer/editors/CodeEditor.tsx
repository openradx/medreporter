import { Stack, useMantineColorScheme } from "@mantine/core"
import CodeMirror, { EditorView, Extension } from "@uiw/react-codemirror"
import { useRef } from "react"
import { useDebouncedCallback } from "use-debounce"
import { EditorToolbar } from "./EditorToolbar"

interface CodeEditorProps {
  codeType: "javascript" | "json" | "markdown" | "svg"
  extensions: Extension[]
  value: string
  onChange: (value: string) => void
}

export const CodeEditor = ({ codeType, extensions, value, onChange }: CodeEditorProps) => {
  const { colorScheme } = useMantineColorScheme()
  const valueRef = useRef(value)
  const viewRef = useRef<EditorView>()

  const minHeight = "200px"

  const theme = EditorView.theme({
    "& div.cm-scroller": {
      minHeight: `${minHeight} !important`,
    },
    "&": { height: "100%" },
    ".cm-scroller": { overflow: "auto" },
  })

  const handleChange = useDebouncedCallback(onChange, 500)

  return (
    <Stack gap="xs" h="calc(100% - 32px)" style={{ flexGrow: 1 }}>
      <EditorToolbar codeType={codeType} viewRef={viewRef} />
      <CodeMirror
        minHeight={minHeight}
        theme={colorScheme === "dark" ? "dark" : "light"}
        extensions={[theme, ...extensions]}
        value={valueRef.current}
        onChange={handleChange}
        onCreateEditor={(view) => {
          viewRef.current = view
        }}
      />
    </Stack>
  )
}
