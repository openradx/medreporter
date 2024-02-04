import { Stack, Text } from "@mantine/core"
import { useState } from "react"
import { useController } from "react-hook-form"
import { useDebouncedCallback } from "use-debounce"
import { ZodError } from "zod"
import { Option, optionsSchema } from "~/schemas/structure"
import { JsonEditor } from "../editors/JsonEditor"
import classes from "./OptionsCodeEditor.module.css"

export const OptionsCodeEditor = () => {
  const {
    field: { value, onChange },
  } = useController<{ options: Option[] }>({ name: "options" })

  const source = JSON.stringify(value, null, "  ")
  const [error, setError] = useState<string | null>(null)

  const debounced = useDebouncedCallback((newOptionsString: string) => {
    try {
      const data = JSON.parse(newOptionsString)
      const options = optionsSchema.parse(data)
      onChange(options)
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

  const handleChange = (newOptionsString: string) => {
    setError(null)
    debounced(newOptionsString)
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
