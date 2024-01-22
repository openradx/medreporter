import { ActionIcon } from "@mantine/core"
import { MdCode as CodeIcon } from "react-icons/md"

export const ScriptEditorButton = () => (
  <ActionIcon color="red" size="sm" variant="subtle">
    <CodeIcon size={20} />
  </ActionIcon>
)
