import { useLingui } from "@lingui/react/macro"
import { ActionIcon } from "@mantine/core"
import { Redo as RedoIcon } from "lucide-react"
import { setStructureDataModified } from "~/state/displaySlice"
import { useAppDispatch, useAppSelector } from "~/state/store"
import { selectCanRedoHistoryData } from "~/state/structureHistoryDataSlice"
import { setStructureLiveData } from "~/state/structureLiveDataSlice"
import { changeHistoryDebounced, redoAndSelect } from "~/state/thunks"

export const RedoButton = () => {
  const { t } = useLingui()
  const canRedo = useAppSelector(selectCanRedoHistoryData)
  const dispatch = useAppDispatch()

  return (
    <ActionIcon
      title={t`Redo`}
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
