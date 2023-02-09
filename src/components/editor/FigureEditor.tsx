import dynamic from "next/dynamic"
import { CodeEditorLoader } from "./CodeEditorLoader"
import { Editor } from "./Editor"
import { FigurePreview } from "./FigurePreview"
import { FigureProperties } from "./FigureProperties"

const FigureCodeEditor = dynamic(() => import("./FigureCodeEditor"), {
  loading: () => <CodeEditorLoader />,
  ssr: false,
})

export const FigureEditor = () => (
  <Editor
    properties={<FigureProperties />}
    codeEditor={<FigureCodeEditor />}
    preview={<FigurePreview />}
  />
)
