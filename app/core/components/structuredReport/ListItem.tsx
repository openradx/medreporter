import { ReactNode } from "react"

interface ListItemProps {
  children?: ReactNode
}

export const ListItem = ({ children }: ListItemProps) => <li>{children}</li>
