import { ActionIcon } from "@mantine/core"
import { useClipboard } from "@mantine/hooks"
import { showNotification } from "@mantine/notifications"
import { MdContentCopy } from "react-icons/md"
import { REPORT_CONTENT_ID } from "../../constants/general"
import { useSiteTranslation } from "../../hooks/useSiteTranslation"

export const CopyReportButton = () => {
  const clipboard = useClipboard()
  const { t } = useSiteTranslation()

  return (
    <ActionIcon
      variant="default"
      onClick={() => {
        const el = document.getElementById(REPORT_CONTENT_ID)
        clipboard.copy(el!.innerText)
        showNotification({
          message: t("CopyReportButton.notification"),
          color: "green",
        })
      }}
    >
      <MdContentCopy />
    </ActionIcon>
  )
}
