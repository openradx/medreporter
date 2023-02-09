import dynamic from "next/dynamic"
import { CodeEditorLoader } from "./CodeEditorLoader"
import { Editor } from "./Editor"
import { ModulePreview } from "./ModulePreview"
import { ModuleProperties } from "./ModuleProperties"

const ModuleCodeEditor = dynamic(() => import("./ModuleCodeEditor"), {
  loading: () => <CodeEditorLoader />,
  ssr: false,
})

export const ModuleEditor = () => (
  <Editor
    properties={<ModuleProperties />}
    codeEditor={<ModuleCodeEditor />}
    preview={<ModulePreview />}
  />
)
