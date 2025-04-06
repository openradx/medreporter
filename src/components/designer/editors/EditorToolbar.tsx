import { undo, redo, toggleComment } from "@codemirror/commands"
import { openLintPanel } from "@codemirror/lint"
import { openSearchPanel } from "@codemirror/search"
import { ActionIcon, Divider, Group } from "@mantine/core"
import { EditorView } from "@uiw/react-codemirror"
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
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { formatCode } from "~/utils/codeFormatting"

interface EditorToolbarProps {
  codeType: "javascript" | "json" | "markdown" | "svg" | "string"
  viewRef: RefObject<undefined | EditorView>
}

export const EditorToolbar = ({ codeType, viewRef }: EditorToolbarProps) => {
  const { t } = useSiteTranslation()

  return (
    <Group gap={4}>
      <ActionIcon
        variant="default"
        title={t("EditorToolbar.searchTooltip")}
        onClick={() => {
          invariant(viewRef.current, "Editor view is undefined")
          const view = viewRef.current
          view.focus()
          openSearchPanel(view)
        }}
      >
        <SearchIcon size={16} />
      </ActionIcon>
      <ActionIcon
        variant="default"
        title={t("EditorToolbar.diagnosticsTooltip")}
        onClick={() => {
          invariant(viewRef.current, "Editor view is undefined")
          const view = viewRef.current
          view.focus()
          openLintPanel(view)
        }}
      >
        <DiagnosticsIcon size={16} />
      </ActionIcon>
      <Divider mx={2} labelPosition="center" orientation="vertical" />
      <ActionIcon
        variant="default"
        title={t("EditorToolbar.undoTooltip")}
        onClick={() => {
          invariant(viewRef.current, "Editor view is undefined")
          const view = viewRef.current
          view.focus()
          undo(view)
        }}
      >
        <UndoIcon size={16} />
      </ActionIcon>
      <ActionIcon
        variant="default"
        title={t("EditorToolbar.redoTooltip")}
        onClick={() => {
          invariant(viewRef.current, "Editor view is undefined")
          const view = viewRef.current
          view.focus()
          redo(view)
        }}
      >
        <RedoIcon size={16} />
      </ActionIcon>
      <Divider mx={2} orientation="vertical" />
      <ActionIcon
        variant="default"
        title={t("EditorToolbar.copyTooltip")}
        onClick={async () => {
          invariant(viewRef.current, "Editor view is undefined")
          const view = viewRef.current
          view.focus()
          const { state } = view
          const text = state.sliceDoc(state.selection.main.from, state.selection.main.to)
          if (text) await navigator.clipboard.writeText(text)
        }}
      >
        <CopyIcon size={16} />
      </ActionIcon>
      <ActionIcon
        variant="default"
        title={t("EditorToolbar.pasteTooltip")}
        onClick={async () => {
          invariant(viewRef.current, "Editor view is undefined")
          const view = viewRef.current
          view.focus()
          const text = await navigator.clipboard.readText()
          const { from } = view.state.selection.main
          const { to } = view.state.selection.main
          view.dispatch({
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
        title={t("EditorToolbar.formatTooltip")}
        onClick={async () => {
          invariant(viewRef.current, "Editor view is undefined")
          const view = viewRef.current
          view.focus()
          const result = await formatCode(
            codeType,
            view.state.doc.toString(),
            view.state.selection.main.anchor
          )
          view.dispatch({
            changes: {
              from: 0,
              to: view.state.doc.length,
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
        title={t("EditorToolbar.toggleCommentTooltip")}
        onClick={() => {
          invariant(viewRef.current, "Editor view is undefined")
          const view = viewRef.current
          view.focus()
          toggleComment(view)
        }}
      >
        <ToggleCommentIcon size={16} />
      </ActionIcon>
      <Divider mx={2} orientation="vertical" />
      <ActionIcon
        variant="default"
        title={t("EditorToolbar.helpTooltip")}
        onClick={() => {
          viewRef.current?.focus()
        }}
      >
        <HelpIcon size={16} />
      </ActionIcon>
    </Group>
  )
}
