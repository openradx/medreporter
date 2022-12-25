import { Box, Global, Paper, Stack, useMantineColorScheme } from "@mantine/core"
import { SchemaConfiguration } from "@medreporter/medtl-language-service"
import { ModuleSchema, TemplateSchema } from "@medreporter/medtl-schema"
import { setDiagnosticsOptions } from "@medreporter/monaco-plugin-medtl"
import { useCallback, useRef } from "react"
import MonacoEditor, { monaco } from "react-monaco-editor"
import { useResizeDetector } from "react-resize-detector"
import { useDebouncedCallback } from "use-debounce"
import { selectSource, selectType, setSource } from "../../state/editorSlice"
import { useAppDispatch, useAppSelector } from "../../state/store"
import { SourceProblemsPanel } from "./SourceEditorProblems"
import { SourceEditorToolbar } from "./SourceEditorToolbar"

const moduleSchema: SchemaConfiguration = {
  id: "module-schema",
  patterns: [/.*/],
  schema: ModuleSchema,
}

const templateSchema: SchemaConfiguration = {
  id: "template-schema",
  patterns: [/.*/],
  schema: TemplateSchema,
}

const SourceEditor = () => {
  const type = useAppSelector(selectType)
  const initialSource = useAppSelector(selectSource)
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

  const updateSourceDebounced = useDebouncedCallback((source: string) => {
    dispatch(setSource(source))
  }, 1000)

  let schema: SchemaConfiguration
  if (type === "module") {
    schema = moduleSchema
  } else if (type === "template") {
    schema = templateSchema
  } else {
    throw new Error(`Missing schema for type "${type}".`)
  }

  return (
    <>
      <Global styles={{ ".monaco-hover": { zIndex: 1000 } }} />
      <Paper shadow="sm" sx={{ height: "100%" }} withBorder>
        <Stack spacing="xs" ref={stackRef} sx={{ height: "100%" }}>
          <SourceEditorToolbar editor={editorRef.current} />
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
              value={initialSource}
              defaultValue={initialSource}
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
                updateSourceDebounced(value)
              }}
            />
          </Box>
          <SourceProblemsPanel editor={editorRef.current} />
        </Stack>
      </Paper>
    </>
  )
}

export default SourceEditor
