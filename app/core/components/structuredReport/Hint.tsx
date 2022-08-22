import { Alert } from "@mantine/core"
import { ReactNode } from "react"
import { AiOutlineExclamationCircle as WarningIcon } from "react-icons/ai"
import { RiLightbulbLine as HintIcon } from "react-icons/ri"

interface HintProps {
  type: "warning" | "hint"
  children: ReactNode
}

export const Hint = ({ type, children }: HintProps) => (
  <Alert
    icon={type === "warning" ? <WarningIcon /> : <HintIcon />}
    color={type === "warning" ? "red" : "blue"}
  >
    {children}
  </Alert>
)
