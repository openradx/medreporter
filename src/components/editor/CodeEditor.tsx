import { Box, Global, Paper, Stack, useMantineColorScheme } from "@mantine/core"
import { editor, IDisposable } from "monaco-editor"
import { useCallback, useEffect, useRef } from "react"
import { useResizeDetector } from "react-resize-detector"
import { SourceProblemsPanel } from "./CodeEditorProblems"
import { CodeEditorToolbar } from "./CodeEditorToolbar"

interface CodeEditorProps {
  language: "medtl" | "svg"
  initialSource: string
  onSetup?: () => void
  onChange?: (source: string) => void
}

export const CodeEditor = ({ language, initialSource, onSetup, onChange }: CodeEditorProps) => {
  const { colorScheme } = useMantineColorScheme()

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

  useEffect(
    () => {
      if (containerRef.current) {
        editorRef.current = editor.create(containerRef.current, {
          language,
          value: initialSource,
          theme,
        })

        onSetup?.()

        subscriptionRef.current = editorRef.current!.onDidChangeModelContent(() => {
          onChange?.(editorRef.current!.getValue())
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
          <CodeEditorToolbar editor={editorRef.current} />
          <Box
            sx={{
              flexGrow: 1,
              minHeight: 0, // make Monaco editor resizable
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
