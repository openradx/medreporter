import { json, jsonParseLinter } from "@codemirror/lang-json"
import { linter } from "@codemirror/lint"
import { Stack, useMantineColorScheme } from "@mantine/core"
import CodeMirror, { EditorView } from "@uiw/react-codemirror"
import copy from "fast-copy"
import { useRef, useState } from "react"
import { useDebouncedCallback } from "use-debounce"
import { ZodError } from "zod"
import { MultipleChoiceFieldNode, SingleChoiceFieldNode, optionsSchema } from "~/schemas/structure"
import { useAppDispatch } from "~/state/store"
import { updateNode } from "~/state/templateSlice"
import classes from "./OptionsCodeEditor.module.css"

interface OptionsCodeEditorProps {
  node: SingleChoiceFieldNode | MultipleChoiceFieldNode
}

export const OptionsCodeEditor = ({ node }: OptionsCodeEditorProps) => {
  const dispatch = useAppDispatch()
  const { colorScheme } = useMantineColorScheme()
  const source = JSON.stringify(node.options, null, "  ")
  const sourceRef = useRef(source)
  const [error, setError] = useState<string | null>(null)

  const minHeight = "200px"

  const theme = EditorView.theme({
    "& div.cm-scroller": {
      minHeight: `${minHeight} !important`,
    },
  })

  const debounced = useDebouncedCallback((value: string) => {
    try {
      const data = JSON.parse(value)
      const options = optionsSchema.parse(data)
      dispatch(updateNode({ nodeId: node.nodeId, data: { options: copy(options) } }))
    } catch (e) {
      if (e instanceof SyntaxError) {
        setError(`Invalid JSON: ${e.message}`)
      } else if (e instanceof ZodError) {
        setError(`Invalid options: ${e.message}`)
      } else {
        setError(`Unknown error: ${e}`)
      }
    }
  }, 200)

  const handleChange = (value: string) => {
    setError(null)
    debounced(value)
  }

  const linterExt = linter(jsonParseLinter())

  return (
    <Stack h="100%" gap={0} className={classes.optionsCodeEditor}>
      <CodeMirror
        minHeight={minHeight}
        height="100%"
        theme={colorScheme === "dark" ? "dark" : "light"}
        extensions={[theme, json(), linterExt]}
        value={sourceRef.current}
        onChange={handleChange}
      />
      {error && <p style={{ color: "red", height: "50px", margin: 0, padding: 4 }}>{error}</p>}
    </Stack>
  )
}
