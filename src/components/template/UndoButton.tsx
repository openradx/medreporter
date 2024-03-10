import { ActionIcon } from "@mantine/core"
import { MdUndo as UndoIcon } from "react-icons/md"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { setStructureDataModified } from "~/state/displaySlice"
import { useAppDispatch, useAppSelector } from "~/state/store"
import { selectCanUndoHistoryData } from "~/state/structureHistoryDataSlice"
import { setStructureLiveData } from "~/state/structureLiveDataSlice"
import { changeHistoryDebounced, undoAndSelect } from "~/state/thunks"

export const UndoButton = () => {
  const { t } = useSiteTranslation()
  const canUndo = useAppSelector(selectCanUndoHistoryData)
  const dispatch = useAppDispatch()

  return (
    <ActionIcon
      title={t("UndoButton.title")}
      variant="default"
      disabled={!canUndo}
      onClick={() => {
        changeHistoryDebounced.flush()
        const structureData = dispatch(undoAndSelect())
        dispatch(setStructureLiveData(structureData))
        dispatch(setStructureDataModified(true))
      }}
      aria-label="Undo"
    >
      <UndoIcon size={20} />
    </ActionIcon>
  )
}
