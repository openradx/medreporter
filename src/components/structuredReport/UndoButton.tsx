import { ActionIcon } from "@mantine/core"
import { MdUndo } from "react-icons/md"
import { useStructureForm } from "../../contexts/StructureFormContext"

export const UndoButton = () => {
  const { canUndo, undo } = useStructureForm()

  return (
    <ActionIcon variant="default" disabled={!canUndo} onClick={() => undo()} aria-label="Undo">
      <MdUndo size={20} />
    </ActionIcon>
  )
}
