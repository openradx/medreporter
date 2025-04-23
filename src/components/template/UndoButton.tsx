import { useLingui } from "@lingui/react/macro"
import { ActionIcon } from "@mantine/core"
import { Undo as UndoIcon } from "lucide-react"
import { useAppDispatch, useAppSelector } from "~/state/store"
import { selectCanUndoHistoryData } from "~/state/structureHistoryDataSlice"
import { undoStructure } from "~/state/thunks"

export const UndoButton = () => {
  const { t } = useLingui()
  const canUndo = useAppSelector(selectCanUndoHistoryData)
  const dispatch = useAppDispatch()

  return (
    <ActionIcon
      title={t`Undo`}
      variant="default"
      disabled={!canUndo}
      onClick={() => {
        dispatch(undoStructure())
      }}
      aria-label="Undo"
    >
      <UndoIcon size={20} />
    </ActionIcon>
  )
}
