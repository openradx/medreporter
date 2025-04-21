import { useLingui } from "@lingui/react/macro"
import { ActionIcon } from "@mantine/core"
import { Redo as RedoIcon } from "lucide-react"
import { setSelectedItem } from "~/state/designerSlice"
import { useAppDispatch, useAppSelector } from "~/state/store"
import { redo, selectCanRedo } from "~/state/templateSlice"

export const RedoButton = () => {
  const { t } = useLingui()
  const canRedo = useAppSelector(selectCanRedo)
  const dispatch = useAppDispatch()

  return (
    <ActionIcon
      title={t`Redo`}
      variant="default"
      disabled={!canRedo}
      onClick={() => {
        dispatch(setSelectedItem(null))
        dispatch(redo())
      }}
      aria-label="Redo"
    >
      <RedoIcon size={20} />
    </ActionIcon>
  )
}
