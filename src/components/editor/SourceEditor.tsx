import { Box, Global, Paper, Stack, useMantineColorScheme } from "@mantine/core"
import { SchemaConfiguration } from "@medreporter/medtl-language-service"
import { ModuleSchema, TemplateSchema } from "@medreporter/medtl-schema"
import { setDiagnosticsOptions } from "@medreporter/monaco-plugin-medtl"
import { editor, IDisposable } from "monaco-editor"
import { useCallback, useEffect, useRef } from "react"
import { useResizeDetector } from "react-resize-detector"
import { useDebouncedCallback } from "use-debounce"
import { selectSource, selectType, setSource } from "~/state/editorSlice"
import { useAppDispatch, useAppSelector } from "~/state/store"
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
  const { colorScheme } = useMantineColorScheme()
  const dispatch = useAppDispatch()

  const stackRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<editor.IStandaloneCodeEditor>()
  const subscriptionRef = useRef<IDisposable>()

  const onResize = useCallback(() => {
    editorRef.current?.layout()
  }, [])

  useResizeDetector({
    targetRef: stackRef,
    onResize,
  })

  const theme = colorScheme === "dark" ? "vs-dark" : "vs"

  let schema: SchemaConfiguration
  if (type === "module") {
    schema = moduleSchema
  } else if (type === "template") {
    schema = templateSchema
  } else {
    throw new Error(`Missing schema for type "${type}".`)
  }

  const updateSourceDebounced = useDebouncedCallback((source: string) => {
    dispatch(setSource(source))
  }, 1000)

  useEffect(
    () => {
      if (containerRef.current) {
        editorRef.current = editor.create(containerRef.current, {
          language: "medtl",
          value: initialSource,
          theme,
        })

        subscriptionRef.current = editorRef.current!.onDidChangeModelContent(() => {
          updateSourceDebounced(editorRef.current!.getValue())
        })

        setDiagnosticsOptions({
          schemas: [schema],
        })
      }
      return () => {
        editorRef.current?.dispose()
        editorRef.current?.getModel()?.dispose()
        subscriptionRef.current?.dispose()
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  useEffect(() => {
    editor.setTheme(theme)
  }, [theme])

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
            <Box className="monaco-editor-container" ref={containerRef} h="100%" />
          </Box>
          <SourceProblemsPanel editor={editorRef.current} />
        </Stack>
      </Paper>
    </>
  )
}

export default SourceEditor
