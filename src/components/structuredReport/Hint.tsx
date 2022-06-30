import { Alert } from "@mantine/core"
import { ReactNode } from "react"
import { TbInfoCircle as HintIcon } from "react-icons/tb"

interface HintProps {
  children: ReactNode
}

export const Hint = ({ children }: HintProps) => (
  <Alert icon={<HintIcon />} sx={{ display: "inline-block" }}>
    {children}
  </Alert>
)
