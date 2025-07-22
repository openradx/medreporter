import { Alert } from "@mantine/core"
import {
  CircleAlert as ErrorIcon,
  Lightbulb as InfoIcon,
  TriangleAlert as WarningIcon,
} from "lucide-react"

interface HintProps {
  level?: "info" | "warning" | "error"
  content: string
  hidden?: boolean
}

export const Hint = ({ level, hidden = false, content }: HintProps) => {
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
