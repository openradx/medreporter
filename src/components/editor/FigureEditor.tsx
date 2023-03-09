import dynamic from "next/dynamic"
import { CodeEditorLoader } from "./CodeEditorLoader"
import { FigurePreview } from "./FigurePreview"
import { FigureProperties } from "./FigureProperties"
import { ResourceEditor } from "./ResourceEditor"

const FigureCodeEditor = dynamic(() => import("./FigureCodeEditor"), {
  loading: () => <CodeEditorLoader />,
  ssr: false,
})

export const FigureEditor = () => (
  <ResourceEditor
    general={<FigureProperties />}
    source={<FigureCodeEditor />}
    preview={<FigurePreview />}
  />
)
