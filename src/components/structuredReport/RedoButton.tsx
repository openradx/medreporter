import { ActionIcon } from "@mantine/core"
import { MdRedo } from "react-icons/md"
import { useStructureForm } from "../../contexts/StructureFormContext"

export const RedoButton = () => {
  const { canRedo, redo } = useStructureForm()

  return (
    <ActionIcon variant="default" disabled={!canRedo} onClick={() => redo()} aria-label="Redo">
      <MdRedo size={20} />
    </ActionIcon>
  )
}
