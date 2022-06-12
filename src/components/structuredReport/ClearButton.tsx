import { ActionIcon } from "@mantine/core"
import { AiOutlineClear } from "react-icons/ai"
import { useStructureForm } from "../../contexts/StructureFormContext"

export const ClearButton = () => {
  const { clearForm } = useStructureForm()

  return (
    <ActionIcon variant="light" onClick={clearForm} aria-label="Clear form">
      <AiOutlineClear size={20} />
    </ActionIcon>
  )
}
