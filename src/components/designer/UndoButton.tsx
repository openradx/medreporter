import { ActionIcon } from "@mantine/core"
import { Undo as UndoIcon } from "lucide-react"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { setSelectedItem } from "~/state/designerSlice"
import { useAppDispatch, useAppSelector } from "~/state/store"
import { undo, selectCanUndo } from "~/state/templateSlice"

export const UndoButton = () => {
  const { t } = useSiteTranslation()
  const canUndo = useAppSelector(selectCanUndo)
  const dispatch = useAppDispatch()

  return (
    <ActionIcon
      title={t("UndoButton.title")}
      variant="default"
      disabled={!canUndo}
      onClick={() => {
        dispatch(setSelectedItem(null))
        dispatch(undo())
      }}
      aria-label="Undo"
    >
      <UndoIcon size={20} />
    </ActionIcon>
  )
}
