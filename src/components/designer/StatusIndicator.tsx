import { useLingui } from "@lingui/react/macro"
import { ActionIcon } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { useSyncTemplate } from "~/hooks/useSyncTemplate"
import { selectStatus } from "~/state/displaySlice"
import { useAppSelector } from "~/state/store"
import { LogModal } from "./LogModal"

export const StatusIndicator = () => {
  const { t } = useLingui()
  const [opened, { open, close }] = useDisclosure(false)
  const status = useAppSelector(selectStatus)
  const states = new Set(Object.values(status).map((s) => s.state))

  let indicatorColor = "green"
  if (states.has("doing")) indicatorColor = "blue"
  if (states.has("error")) indicatorColor = "red"

  useSyncTemplate()

  return (
    <>
      <ActionIcon
        title={t`Open log`}
        size="xs"
        variant="default"
        style={{
          backgroundColor: indicatorColor,
          opacity: 0.7,
        }}
        radius="xl"
        onClick={open}
      />
      <LogModal opened={opened} onClose={close} />
    </>
  )
}
