import { Group, Sx } from "@mantine/core"
import { ReactNode } from "react"

interface ActionsGroupProps {
  sx?: Sx
  children: ReactNode
}

export const ActionsGroup = ({ sx, children }: ActionsGroupProps) => (
  <Group spacing="xs" sx={sx}>
    {children}
  </Group>
)
