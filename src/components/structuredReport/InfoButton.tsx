import { ActionIcon } from "@mantine/core"
import { BiInfoCircle as InfoIcon } from "react-icons/bi"

export const InfoButton = () => {
  return (
    <ActionIcon variant="default" onClick={() => {}} aria-label="Open info dialog">
      <InfoIcon size={20} />
    </ActionIcon>
  )
}
