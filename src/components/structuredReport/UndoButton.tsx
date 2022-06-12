import { ActionIcon } from "@mantine/core"
import { useFormContext } from "react-hook-form"
import { MdUndo } from "react-icons/md"
import { selectCanUndo, undo } from "../../state/historyTrackerSlice"
import { useAppDispatch, useAppSelector } from "../../state/store"

export const UndoButton = () => {
  const { reset } = useFormContext()
  const dispatch = useAppDispatch()
  const canUndo = useAppSelector(selectCanUndo)

  const handleClick = () => {
    const state = dispatch(undo())
    if (state) {
      const structureData = state.structureData.present
      reset(structureData)
    }
  }

  return (
    <ActionIcon variant="light" disabled={!canUndo} onClick={handleClick} aria-label="Undo">
      <MdUndo size={20} />
    </ActionIcon>
  )
}
