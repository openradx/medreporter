import { Group } from "@mantine/core"
import { ReactNode } from "react"

interface ActionsGroupProps {
  grow?: boolean
  children: ReactNode
}

export const ActionsGroup = ({ grow = false, children }: ActionsGroupProps) => (
  <Group
    gap="xs"
    style={{ flexGrow: grow ? 1 : 0, justifyContent: grow ? "center" : "flex-start" }}
  >
    {children}
  </Group>
)
