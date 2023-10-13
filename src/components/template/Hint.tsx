import { Alert } from "@mantine/core"
import { ReactNode } from "react"
import { AiOutlineWarning as WarningIcon } from "react-icons/ai"
import { RiLightbulbLine as InfoIcon } from "react-icons/ri"

interface HintProps {
  level?: "info" | "warning" | "error"
  children: ReactNode
}

export const Hint = ({ level, children }: HintProps) => (
  <Alert
    icon={level === "warning" ? <WarningIcon /> : <InfoIcon />}
    color={level === "warning" ? "yellow" : "blue"}
    my="sm"
  >
    {children}
  </Alert>
)
