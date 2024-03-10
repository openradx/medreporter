import { ActionIcon } from "@mantine/core"
import { MdRedo as RedoIcon } from "react-icons/md"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { setStructureDataModified } from "~/state/displaySlice"
import { useAppDispatch, useAppSelector } from "~/state/store"
import { selectCanRedoHistoryData } from "~/state/structureHistoryDataSlice"
import { setStructureLiveData } from "~/state/structureLiveDataSlice"
import { changeHistoryDebounced, redoAndSelect } from "~/state/thunks"

export const RedoButton = () => {
  const { t } = useSiteTranslation()
  const canRedo = useAppSelector(selectCanRedoHistoryData)
  const dispatch = useAppDispatch()

  return (
    <ActionIcon
      title={t("RedoButton.title")}
      variant="default"
      disabled={!canRedo}
      onClick={() => {
        changeHistoryDebounced.flush()
        const structureData = dispatch(redoAndSelect())
        dispatch(setStructureLiveData(structureData))
        dispatch(setStructureDataModified(true))
      }}
      aria-label="Redo"
    >
      <RedoIcon size={20} />
    </ActionIcon>
  )
}
