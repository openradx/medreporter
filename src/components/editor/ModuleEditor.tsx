import dynamic from "next/dynamic"
import { CodeEditorLoader } from "./CodeEditorLoader"
import { ModulePreview } from "./ModulePreview"
import { ModuleProperties } from "./ModuleProperties"
import { ResourceEditor } from "./ResourceEditor"

const ModuleCodeEditor = dynamic(() => import("./ModuleCodeEditor"), {
  loading: () => <CodeEditorLoader />,
  ssr: false,
})

export const ModuleEditor = () => (
  <ResourceEditor
    general={<ModuleProperties />}
    source={<ModuleCodeEditor />}
    preview={<ModulePreview />}
  />
)
