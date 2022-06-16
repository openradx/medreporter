import { Box } from "@mantine/core"
import { ReactNode } from "react"

interface ConclusionProps {
  children?: ReactNode
}

export const Conclusion = ({ children }: ConclusionProps) => <Box>{children}</Box>
