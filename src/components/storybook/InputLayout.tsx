import { Box } from "@mantine/core"
import { ReactNode } from "react"

export interface InputLayoutProps {
  width?: number
  children: ReactNode
}

export const InputLayout = ({ width = 250, children }: InputLayoutProps) => (
  <Box w={width}>{children}</Box>
)
