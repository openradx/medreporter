import { ActionIcon } from "@mantine/core"
import { useFormContext } from "react-hook-form"
import { MdRedo } from "react-icons/md"
import { redo, selectCanRedo } from "../../state/historyTrackerSlice"
import { useAppDispatch, useAppSelector } from "../../state/store"

export const RedoButton = () => {
  const { reset } = useFormContext()
  const dispatch = useAppDispatch()
  const canRedo = useAppSelector(selectCanRedo)

  const handleClick = () => {
    const state = dispatch(redo())
    if (state) {
      const structureData = state.structureData.present
      reset(structureData)
    }
  }

  return (
    <ActionIcon variant="light" disabled={!canRedo} onClick={handleClick} aria-label="Redo">
      <MdRedo size={20} />
    </ActionIcon>
  )
}
