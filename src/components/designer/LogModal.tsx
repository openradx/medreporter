import { Alert, Modal, ScrollArea, Stack } from "@mantine/core"
import { CircleAlert as ErrorIcon, CircleCheck as SuccessIcon } from "lucide-react"
import { useEffect, useRef } from "react"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { selectLog } from "~/state/displaySlice"
import { useAppSelector } from "~/state/store"

interface SyncingLogModalProps {
  opened: boolean
  onClose: () => void
}

export const LogModal = ({ opened, onClose }: SyncingLogModalProps) => {
  const { t } = useSiteTranslation()
  const log = useAppSelector(selectLog)

  const viewport = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (opened) {
      setTimeout(() => {
        viewport.current!.scrollTo({ top: viewport.current!.scrollHeight, behavior: "instant" })
      }, 10)
    }
  }, [opened])

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={t("LogModal.modalTitle")}
      scrollAreaComponent={(props) => <ScrollArea.Autosize {...props} viewportRef={viewport} />}
    >
      <Stack gap="xs">
        {!log.length && t("LogModal.emptyMessage")}
        {log.map((logEntry, index) => (
          <Alert
            key={index}
            color={logEntry.level === "error" ? "red" : "green"}
            title={new Date(logEntry.timestamp).toLocaleString()}
            styles={{ root: { padding: "2px" }, body: { gap: "2px" } }}
            icon={logEntry.level === "error" ? <ErrorIcon /> : <SuccessIcon />}
            variant="transparent"
          >
            {logEntry.message}
          </Alert>
        ))}
      </Stack>
    </Modal>
  )
}
