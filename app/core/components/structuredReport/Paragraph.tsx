import { Box } from "@mantine/core"
import { ReactNode } from "react"

interface ParagraphProps {
  children?: ReactNode
}

export const Paragraph = ({ children }: ParagraphProps) => (
  <Box className="medreporter-Paragraph-root" sx={{ display: "block" }}>
    {children}
  </Box>
)
