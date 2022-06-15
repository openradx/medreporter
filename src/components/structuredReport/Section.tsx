import { Box } from "@mantine/core"
import { ReactNode } from "react"
import { SectionContextProvider } from "../../contexts/SectionContext"

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
    <SectionContextProvider value={{ sectionId: id }}>{children}</SectionContextProvider>
  </Box>
)
