import { Box, Global, Paper, Stack, useMantineColorScheme } from "@mantine/core"
import { SchemaConfiguration } from "@medreporter/medtl-language-service"
import { ModuleSchema } from "@medreporter/medtl-schema"
import { setDiagnosticsOptions } from "@medreporter/monaco-plugin-medtl"
import { useCallback, useRef } from "react"
import MonacoEditor, { monaco } from "react-monaco-editor"
import { useResizeDetector } from "react-resize-detector"
import { useDebouncedCallback } from "use-debounce"
import { selectResourceType, selectSourceCode, setSourceCode } from "../../state/editorSlice"
import { useAppDispatch, useAppSelector } from "../../state/store"
import { CodeEditorProblems } from "./CodeEditorProblems"
import { CodeEditorToolbar } from "./CodeEditorToolbar"

const moduleSchema: SchemaConfiguration = {
  id: "module-schema",
  patterns: [/.*/],
  schema: ModuleSchema,
}

const CodeEditor = () => {
  const resourceType = useAppSelector(selectResourceType)
  const initialCode = useAppSelector(selectSourceCode)
  const stackRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>()
  const { colorScheme } = useMantineColorScheme()
  const dispatch = useAppDispatch()

  const onResize = useCallback(() => {
    editorRef.current?.layout()
  }, [])

  useResizeDetector({
    targetRef: stackRef,
    onResize,
  })

  const updateSourceCodeDebounced = useDebouncedCallback((value: string) => {
    dispatch(setSourceCode(value))
  }, 1000)

  // TODO:
  const schema = resourceType === "module" ? moduleSchema : moduleSchema

  return (
    <>
      <Global styles={{ ".monaco-hover": { zIndex: 1000 } }} />
      <Paper shadow="sm" sx={{ height: "100%" }} withBorder>
        <Stack spacing="xs" ref={stackRef} sx={{ height: "100%" }}>
          <CodeEditorToolbar editor={editorRef.current} />
          <Box
            sx={{
              flexGrow: 1,

              // Important to make Monaco editor resizable together with
              // automaticLayout option
              minHeight: 0,
            }}
          >
            <MonacoEditor
              language="medtl"
              height="100%"
              theme={colorScheme === "dark" ? "vs-dark" : "vs"}
              defaultValue={initialCode}
              options={{
                tabSize: 2,
                suggest: { snippetsPreventQuickSuggestions: false },
                automaticLayout: true,
              }}
              editorDidMount={(editor) => {
                editorRef.current = editor
                setDiagnosticsOptions({
                  schemas: [schema],
                })
              }}
              onChange={(value) => {
                updateSourceCodeDebounced(value)
              }}
            />
          </Box>
          <CodeEditorProblems editor={editorRef.current} />
        </Stack>
      </Paper>
    </>
  )
}

export default CodeEditor
