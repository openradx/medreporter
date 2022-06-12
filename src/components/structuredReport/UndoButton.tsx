import { ActionIcon } from "@mantine/core"
import { MdUndo } from "react-icons/md"

export const UndoButton = () => (
  <ActionIcon variant="light" aria-label="Undo">
    <MdUndo size={20} />
  </ActionIcon>
)
