import { ActionIcon } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { selectSyncingState } from "~/state/displaySlice"
import { useAppSelector } from "~/state/store"
import { LogModal } from "./LogModal"

export const SyncingStateDisplay = () => {
  const { t } = useSiteTranslation()
  const syncingState = useAppSelector(selectSyncingState)
  const [opened, { open, close }] = useDisclosure(false)

  const getBackgroundColor = (state: string) => {
    switch (state) {
      case "error":
        return "red"
      case "syncing":
        return "blue"
      default:
        return "green"
    }
  }

  return (
    <>
      <ActionIcon
        title={t("SyncingStateDisplay.title")}
        size="xs"
        variant="default"
        style={{
          backgroundColor: getBackgroundColor(syncingState),
          opacity: 0.7,
        }}
        radius="xl"
        onClick={open}
      />
      <LogModal opened={opened} onClose={close} />
    </>
  )
}
