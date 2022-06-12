import { ActionIcon } from "@mantine/core"
import { AiOutlineClear } from "react-icons/ai"

export const ClearButton = () => (
  <ActionIcon variant="light" aria-label="Clear form">
    <AiOutlineClear size={20} />
  </ActionIcon>
)
