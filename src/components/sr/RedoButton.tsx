import { ActionIcon } from "@mantine/core"
import { MdRedo } from "react-icons/md"

export const RedoButton = () => (
  <ActionIcon variant="light" aria-label="Redo">
    <MdRedo size={20} />
  </ActionIcon>
)
