import { ActionIcon } from "@mantine/core"
import { selectSyncingState } from "~/state/displaySlice"
import { useAppSelector } from "~/state/store"

export const SyncingStateDisplay = () => {
  const syncingState = useAppSelector(selectSyncingState)

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
    <ActionIcon
      size="xs"
      variant="default"
      style={{
        backgroundColor: getBackgroundColor(syncingState),
        opacity: 0.7,
      }}
      radius="xl"
    />
  )
}
