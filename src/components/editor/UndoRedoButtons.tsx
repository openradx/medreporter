import { ActionIcon, Group } from "@mantine/core"
import type { editor as editorApi } from "monaco-editor"
import { useEffect, useState } from "react"
import { MdRedo as RedoIcon, MdUndo as UndoIcon } from "react-icons/md"

interface UndoRedoButtonsProps {
  editor?: editorApi.IStandaloneCodeEditor
}

export const UndoRedoButtons = ({ editor }: UndoRedoButtonsProps) => {
  const [undoEnabled, setUndoEnabled] = useState(false)
  const [redoEnabled, setRedoEnabled] = useState(false)

  useEffect(() => {
    const model = editor?.getModel()
    if (editor && model) {
      const initialVersion = model.getAlternativeVersionId()
      let currentVersion = initialVersion
      let lastVersion = initialVersion

      const disposable = editor.onDidChangeModelContent(() => {
        const versionId = model.getAlternativeVersionId()

        // undoing
        if (versionId < currentVersion) {
          setRedoEnabled(true)
          // no more undo possible
          if (versionId === initialVersion) {
            setUndoEnabled(false)
          }
        } else {
          // redoing
          if (versionId <= lastVersion) {
            // redoing the last change
            if (versionId === lastVersion) {
              setRedoEnabled(false)
            }
          } else {
            // adding new change, disable redo when adding new changes
            setRedoEnabled(false)
            if (currentVersion > lastVersion) {
              lastVersion = currentVersion
            }
          }
          setUndoEnabled(true)
        }
        currentVersion = versionId
      })
      return () => disposable.dispose()
    }
    return () => {}
  }, [editor])

  return (
    <Group spacing={8}>
      <ActionIcon
        variant="default"
        onClick={() => {
          editor?.trigger("app", "undo", null)
          editor?.focus()
        }}
        disabled={!undoEnabled}
      >
        <UndoIcon />
      </ActionIcon>
      <ActionIcon
        variant="default"
        onClick={() => {
          editor?.trigger("app", "redo", null)
          editor?.focus()
        }}
        disabled={!redoEnabled}
      >
        <RedoIcon />
      </ActionIcon>
    </Group>
  )
}
