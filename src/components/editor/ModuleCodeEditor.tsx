import { ModuleSchema } from "@medreporter/medtl-schema"
import { SchemaConfiguration, setDiagnosticsOptions } from "@medreporter/monaco-plugin-medtl"
import { useDebouncedCallback } from "use-debounce"
import { selectEditorState } from "~/state/editorSlice"
import { selectModule, updateModuleCode } from "~/state/modulesSlice"
import { useAppDispatch, useAppSelector } from "~/state/store"
import { CodeEditor } from "./CodeEditor"

const moduleSchema: SchemaConfiguration = {
  id: "module-schema",
  patterns: [/.*/],
  schema: ModuleSchema,
}

const setup = () => {
  setDiagnosticsOptions({ schemas: [moduleSchema] })
}

const ModuleCodeEditor = () => {
  const editorState = useAppSelector(selectEditorState)
  const module_ = useAppSelector(selectModule(editorState.resourceName))

  const dispatch = useAppDispatch()
  const updateSourceDebounced = useDebouncedCallback((source: string) => {
    dispatch(updateModuleCode(editorState.resourceName, source))
  }, 1000)

  return (
    <CodeEditor
      language="medtl"
      initialSource={module_.source}
      onSetup={setup}
      onChange={updateSourceDebounced}
    />
  )
}

// default export for dynamic import
export default ModuleCodeEditor
