import { ScrollArea, Stack } from "@mantine/core"
import { ReactNode } from "react"
import { SectionContextProvider } from "~/contexts/SectionContext"
import classes from "./Section.module.css"

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
    {isDesigning ? (
      <ScrollArea style={{ flexGrow: 1 }} className={classes.designerSection}>
        {children}
      </ScrollArea>
    ) : (
      <ScrollArea style={{ flexGrow: 1 }}>
        <Stack h="100%" display={active ? "flex" : "none"} gap="sm" p="sm">
          {children}
        </Stack>
      </ScrollArea>
    )}
  </SectionContextProvider>
)
