import { ActionIcon } from "@mantine/core"
import { AiOutlineClear } from "react-icons/ai"
import { useStructureForm } from "../../contexts/StructureFormContext"

export const ClearButton = () => {
  const { modified, clearForm } = useStructureForm()

  return (
    <ActionIcon variant="default" disabled={!modified} onClick={clearForm} aria-label="Clear form">
      <AiOutlineClear size={20} />
    </ActionIcon>
  )
}
