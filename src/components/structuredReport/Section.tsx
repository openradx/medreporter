import { Box } from "@mantine/core"
import { ReactNode } from "react"

interface SectionProps {
  id: string
  title: string
  visible?: boolean
  children?: ReactNode
}

export const Section = ({ id, title, visible = true, children }: SectionProps) => (
  <Box
    className="medreporter-Section-root"
    data-id={id}
    data-title={title}
    sx={{
      display: visible ? "flex" : "none",
      flexDirection: "column",
      height: "100%",
    }}
  >
    {children}
  </Box>
)
