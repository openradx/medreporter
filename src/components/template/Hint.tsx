import { Alert } from "@mantine/core"
import { AiOutlineWarning as WarningIcon } from "react-icons/ai"
import { MdErrorOutline as ErrorIcon } from "react-icons/md"
import { RiLightbulbLine as InfoIcon } from "react-icons/ri"

interface HintProps {
  level?: "info" | "warning" | "error"
  content: string
  hidden?: boolean
}

export const Hint = ({ level, content, hidden = false }: HintProps) => {
  let icon = <InfoIcon />
  if (level === "warning") {
    icon = <WarningIcon />
  } else if (level === "error") {
    icon = <ErrorIcon />
  }

  let color = "blue"
  if (level === "warning") {
    color = "yellow"
  } else if (level === "error") {
    color = "red"
  }

  return (
    <Alert display={hidden ? "none" : undefined} icon={icon} color={color} my="sm">
      {content}
    </Alert>
  )
}
