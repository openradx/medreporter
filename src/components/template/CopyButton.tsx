import { ActionIcon } from "@mantine/core"
import { notifications } from "@mantine/notifications"
import { Copy as CopyIcon } from "lucide-react"
import { REPORT_CONTENT_ID } from "~/constants/misc"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"

export const CopyButton = () => {
  const { t } = useSiteTranslation()

  return (
    <ActionIcon
      title={t("CopyButton.buttonCopy")}
      variant="default"
      onClick={() => {
        // Copy to clipboard is a tricky thing. There is an old API used
        // here and newer navigator.clipboard which is more difficult to use.
        // see https://stackoverflow.com/a/30810322/166229
        // and https://stackoverflow.com/a/50067769/166229
        // TODO: maybe try the new one, but I couldn't get it to work.
        // Maybe we should take the html, convert it ourselves to text and
        // html output and set the clipboard by using
        // https://w3c.github.io/clipboard-apis/#override-copy

        // Save current selection
        const ranges: Range[] = []
        const selection = window.getSelection()
        if (selection?.rangeCount) {
          for (let i = 0; i < selection.rangeCount; i++) {
            ranges.push(selection.getRangeAt(i))
          }
        }

        // Copy content to clipboard
        window.getSelection()?.removeAllRanges()
        const el = document.getElementById(REPORT_CONTENT_ID)
        const range = document.createRange()
        range.selectNode(el!)
        window.getSelection()?.addRange(range)
        const success = document.execCommand("copy")

        if (success) {
          window.getSelection()?.removeAllRanges()

          // Restore previous selection
          for (const r of ranges) {
            selection?.addRange(r)
          }

          notifications.show({
            message: t("CopyButton.successMessageCopyReport"),
            color: "green",
          })
        } else {
          notifications.show({
            message: t("CopyButton.errorMessageCopyReport"),
            color: "red",
          })
        }
      }}
    >
      <CopyIcon size={18} />
    </ActionIcon>
  )
}
