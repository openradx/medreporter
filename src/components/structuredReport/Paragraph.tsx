import { Box } from "@mantine/core"
import { ReactNode } from "react"

interface ParagraphProps {
  children?: ReactNode
}

export const Paragraph = ({ children }: ParagraphProps) => <Box>{children}</Box>
