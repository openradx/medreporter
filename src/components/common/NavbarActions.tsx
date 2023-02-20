import { Portal } from "@mantine/core"
import { ReactNode } from "react"

interface NavbarActionsProps {
  children: ReactNode
}

export const NavbarActions = ({ children }: NavbarActionsProps) => (
  <Portal target="#navbar-actions">{children}</Portal>
)
