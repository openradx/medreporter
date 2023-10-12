import { Box } from "@mantine/core"
import { ReactNode } from "react"
import { SectionContextProvider } from "~/contexts/SectionContext"

interface SectionProps {
  id: string
  label: string
  active?: boolean
  children?: ReactNode
}

export const Section = ({ id, label, active = true, children }: SectionProps) => (
  <SectionContextProvider value={{ id, label, active }}>
    <Box
      sx={{
        display: active ? "flex" : "none",
        flexDirection: "column",
        alignItems: "stretch",
      }}
    >
      {children}
    </Box>
  </SectionContextProvider>
)
