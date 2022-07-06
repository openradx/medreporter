import { Box } from "@mantine/core"
import { ReactNode } from "react"

interface InputLayoutProps {
  width?: number
  children: ReactNode
}

export const InputLayout = ({ width = 250, children }: InputLayoutProps) => (
  <Box sx={{ width }}>{children}</Box>
)
