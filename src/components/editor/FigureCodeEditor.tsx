import { useDebouncedCallback } from "use-debounce"
import { selectEditorState } from "~/state/editorSlice"
import { selectFigure, updateFigureCode } from "~/state/figuresSlice"
import { useAppDispatch, useAppSelector } from "~/state/store"
import { CodeEditor } from "./CodeEditor"

const FigureCodeEditor = () => {
  const editorState = useAppSelector(selectEditorState)
  const figure = useAppSelector(selectFigure(editorState.resourceName))

  const dispatch = useAppDispatch()
  const updateSourceDebounced = useDebouncedCallback((source: string) => {
    dispatch(updateFigureCode(editorState.resourceName, source))
  }, 1000)

  return (
    <CodeEditor language="svg" initialSource={figure.source} onChange={updateSourceDebounced} />
  )
}

// default export for dynamic import
export default FigureCodeEditor
