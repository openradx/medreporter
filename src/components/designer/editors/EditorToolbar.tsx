import { undo, redo, toggleComment } from "@codemirror/commands"
import { openLintPanel } from "@codemirror/lint"
import { openSearchPanel } from "@codemirror/search"
import { ActionIcon, Divider, Group } from "@mantine/core"
import { EditorView } from "@uiw/react-codemirror"
import { MutableRefObject } from "react"
import { IoMdHelp as HelpIcon } from "react-icons/io"
import {
  MdContentCopy as CopyIcon,
  MdContentPaste as PasteIcon,
  MdFormatPaint as FormatIcon,
  MdRedo as RedoIcon,
  MdSearch as SearchIcon,
  MdUndo as UndoIcon,
} from "react-icons/md"
import { PiStethoscope as DiagnosticsIcon } from "react-icons/pi"
import { TbSlashes as ToggleCommentIcon } from "react-icons/tb"
import invariant from "tiny-invariant"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { formatCode } from "~/utils/codeFormatting"

interface EditorToolbarProps {
  codeType: "javascript" | "json" | "markdown" | "svg"
  viewRef: MutableRefObject<undefined | EditorView>
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
        <SearchIcon />
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
        <DiagnosticsIcon />
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
        <UndoIcon />
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
        <RedoIcon />
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
        <CopyIcon />
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
        <PasteIcon />
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
        <FormatIcon />
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
        <ToggleCommentIcon />
      </ActionIcon>
      <Divider mx={2} orientation="vertical" />
      <ActionIcon
        variant="default"
        title={t("EditorToolbar.helpTooltip")}
        onClick={() => {
          viewRef.current?.focus()
        }}
      >
        <HelpIcon />
      </ActionIcon>
    </Group>
  )
}
