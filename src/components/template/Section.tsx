import { Stack } from "@mantine/core"
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
    <Stack h="100%" display={active ? "flex" : "none"} gap="sm">
      {children}
    </Stack>
  </SectionContextProvider>
)
