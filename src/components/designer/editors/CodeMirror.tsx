import { Extension, StateEffect } from "@codemirror/state"
import { oneDark } from "@codemirror/theme-one-dark"
import { EditorView } from "@codemirror/view"
import { basicSetup } from "codemirror"
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"

const MIN_HEIGHT = "200px"

export interface CodeMirrorProps {
  theme: "dark" | "light"
  extensions: Extension[]
  value: string
  onChange: (value: string) => void
  onCreateEditor?: (editor: EditorView) => void
}

export const CodeMirror = ({
  theme,
  extensions: customExtensions,
  value,
  onChange,
  onCreateEditor,
}: CodeMirrorProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [editor, setEditor] = useState<EditorView | null>(null)

  const preparedExtensions = useMemo(() => {
    const updateListener = EditorView.updateListener.of((vu) => {
      if (vu.docChanged) {
        const currentValue = vu.state.doc.toString()
        onChange(currentValue)
      }
    })

    const ext: Extension[] = [basicSetup, updateListener]

    if (theme === "dark") {
      ext.push(oneDark)
    }

    const customTheme = EditorView.theme({
      "&": { height: "100%" },
      "& div.cm-scroller": {
        minHeight: `${MIN_HEIGHT} !important`,
        overflow: "auto",
      },
    })

    ext.push(customTheme, ...customExtensions)

    return ext
  }, [theme, customExtensions, onChange])

  useLayoutEffect(() => {
    const view = new EditorView({
      doc: value,
      extensions: preparedExtensions,
      parent: containerRef.current!,
    })
    onCreateEditor?.(view)
    setEditor(view)

    return () => {
      setEditor(null)
      view.destroy()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (editor) {
      editor.dispatch({ effects: StateEffect.reconfigure.of(preparedExtensions) })
    }
  }, [editor, preparedExtensions])

  useEffect(() => {
    const currentValue = editor ? editor.state.doc.toString() : ""
    if (editor && value !== currentValue) {
      editor.dispatch({
        changes: { from: 0, to: currentValue.length, insert: value },
      })
    }
  }, [editor, value])

  return <div ref={containerRef} />
}
