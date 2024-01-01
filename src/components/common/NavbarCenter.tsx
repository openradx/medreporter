import { Portal } from "@mantine/core"
import { ReactNode } from "react"
import { NAVBAR_CENTER_ID } from "./Navbar"

interface NavbarCenterProps {
  children: ReactNode
}

export const NavbarCenter = ({ children }: NavbarCenterProps) => (
  <Portal target={`#${NAVBAR_CENTER_ID}`}>{children}</Portal>
)
