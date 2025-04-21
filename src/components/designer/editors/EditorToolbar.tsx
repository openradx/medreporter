import { undo, redo, toggleComment } from "@codemirror/commands"
import { openLintPanel } from "@codemirror/lint"
import { openSearchPanel } from "@codemirror/search"
import { EditorView } from "@codemirror/view"
import { useLingui } from "@lingui/react/macro"
import { ActionIcon, Divider, Group } from "@mantine/core"
import {
  Search as SearchIcon,
  Stethoscope as DiagnosticsIcon,
  Redo as RedoIcon,
  Undo as UndoIcon,
  Copy as CopyIcon,
  Clipboard as PasteIcon,
  PaintRoller as FormatIcon,
  HelpCircle as HelpIcon,
  Hash as ToggleCommentIcon,
} from "lucide-react"
import { RefObject } from "react"
import invariant from "tiny-invariant"
import { CodeType } from "~/types/general"
import { formatCode } from "~/utils/codeFormatting"

interface EditorToolbarProps {
  codeType: CodeType
  editorRef: RefObject<EditorView | null>
}

export const EditorToolbar = ({ codeType, editorRef }: EditorToolbarProps) => {
  const { t } = useLingui()

  return (
    <Group gap={4}>
      <ActionIcon
        variant="default"
        title={t`Search`}
        onClick={() => {
          const editor = editorRef.current
          invariant(editor)
          editor.focus()
          openSearchPanel(editor)
        }}
      >
        <SearchIcon size={16} />
      </ActionIcon>
      <ActionIcon
        variant="default"
        title={t`Diagnostics`}
        onClick={() => {
          const editor = editorRef.current
          invariant(editor)
          editor.focus()
          openLintPanel(editor)
        }}
      >
        <DiagnosticsIcon size={16} />
      </ActionIcon>
      <Divider mx={2} labelPosition="center" orientation="vertical" />
      <ActionIcon
        variant="default"
        title={t`Undo`}
        onClick={() => {
          const editor = editorRef.current
          invariant(editor)
          editor.focus()
          undo(editor)
        }}
      >
        <UndoIcon size={16} />
      </ActionIcon>
      <ActionIcon
        variant="default"
        title={t`Redo`}
        onClick={() => {
          const editor = editorRef.current
          invariant(editor)
          editor.focus()
          redo(editor)
        }}
      >
        <RedoIcon size={16} />
      </ActionIcon>
      <Divider mx={2} orientation="vertical" />
      <ActionIcon
        variant="default"
        title={t`Copy`}
        onClick={async () => {
          const editor = editorRef.current
          invariant(editor)
          editor.focus()
          const { state } = editor
          const text = state.sliceDoc(state.selection.main.from, state.selection.main.to)
          if (text) await navigator.clipboard.writeText(text)
        }}
      >
        <CopyIcon size={16} />
      </ActionIcon>
      <ActionIcon
        variant="default"
        title={t`Paste`}
        onClick={async () => {
          const editor = editorRef.current
          invariant(editor)
          editor.focus()
          const text = await navigator.clipboard.readText()
          const { from } = editor.state.selection.main
          const { to } = editor.state.selection.main
          editor.dispatch({
            changes: {
              from,
              to,
              insert: text,
            },
            selection: { anchor: from + text.length, head: from + text.length },
          })
        }}
      >
        <PasteIcon size={16} />
      </ActionIcon>
      <Divider mx={2} orientation="vertical" />
      <ActionIcon
        variant="default"
        title={t`Format code`}
        onClick={async () => {
          const editor = editorRef.current
          invariant(editor)
          editor.focus()
          const result = await formatCode(
            codeType,
            editor.state.doc.toString(),
            editor.state.selection.main.anchor
          )
          editor.dispatch({
            changes: {
              from: 0,
              to: editor.state.doc.length,
              insert: result[0],
            },
            selection: { anchor: result[1], head: result[1] },
          })
        }}
      >
        <FormatIcon size={16} />
      </ActionIcon>
      <ActionIcon
        variant="default"
        title={t`Toggle comment`}
        onClick={() => {
          const editor = editorRef.current
          invariant(editor)
          editor.focus()
          toggleComment(editor)
        }}
      >
        <ToggleCommentIcon size={16} />
      </ActionIcon>
      <Divider mx={2} orientation="vertical" />
      <ActionIcon
        variant="default"
        title={t`Help`}
        onClick={() => {
          const editor = editorRef.current
          invariant(editor)
          editor.focus()
        }}
      >
        <HelpIcon size={16} />
      </ActionIcon>
    </Group>
  )
}
