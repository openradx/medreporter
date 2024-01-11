import { ScrollArea, Stack } from "@mantine/core"
import { ReactNode } from "react"
import { SectionContextProvider } from "~/contexts/SectionContext"

interface SectionProps {
  id: string
  label: string
  active?: boolean
  children?: ReactNode
  isDesigning?: boolean
}

export const Section = ({
  id,
  label,
  active = true,
  children,
  isDesigning = false,
}: SectionProps) => (
  <SectionContextProvider value={{ id, label, active }}>
    <ScrollArea style={{ flexGrow: 1 }}>
      {isDesigning ? (
        <>{children}</>
      ) : (
        <Stack h="100%" display={active ? "flex" : "none"} gap="sm" p="sm">
          {children}
        </Stack>
      )}
    </ScrollArea>
  </SectionContextProvider>
)
