import { Alert } from "@mantine/core"
import { ReactNode } from "react"
import { AiOutlineWarning as WarningIcon } from "react-icons/ai"
import { RiLightbulbLine as InfoIcon } from "react-icons/ri"

interface HintProps {
  type: "warning" | "info"
  children: ReactNode
}

export const Hint = ({ type, children }: HintProps) => (
  <Alert
    icon={type === "warning" ? <WarningIcon /> : <InfoIcon />}
    color={type === "warning" ? "yellow" : "blue"}
  >
    {children}
  </Alert>
)
