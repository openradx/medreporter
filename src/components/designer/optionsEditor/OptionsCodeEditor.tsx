import { Stack, Text } from "@mantine/core"
import copy from "fast-copy"
import { useState } from "react"
import { useDebouncedCallback } from "use-debounce"
import { ZodError } from "zod"
import { MultipleChoiceFieldNode, SingleChoiceFieldNode, optionsSchema } from "~/schemas/structure"
import { useAppDispatch } from "~/state/store"
import { updateNode } from "~/state/templateSlice"
import { JsonEditor } from "../editors/JsonEditor"
import classes from "./OptionsCodeEditor.module.css"

interface OptionsCodeEditorProps {
  node: SingleChoiceFieldNode | MultipleChoiceFieldNode
}

export const OptionsCodeEditor = ({ node }: OptionsCodeEditorProps) => {
  const dispatch = useAppDispatch()
  const source = JSON.stringify(node.options, null, "  ")
  const [error, setError] = useState<string | null>(null)

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

  return (
    <Stack h="100%" w="100%" gap={0} className={classes.optionsCodeEditor}>
      <JsonEditor value={source} onChange={handleChange} />
      {error && (
        <Text style={{ color: "red", height: "50px", margin: 0, padding: 4 }}>{error}</Text>
      )}
    </Stack>
  )
}
