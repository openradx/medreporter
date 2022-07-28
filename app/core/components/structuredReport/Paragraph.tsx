import { Box } from "@mantine/core"
import { ReactNode } from "react"

interface ParagraphProps {
  last?: boolean
  children?: ReactNode
}

export const Paragraph = ({ last, children }: ParagraphProps) => (
  <Box>
    <Box>{children}</Box>
    {!last && <br />}
  </Box>
)
