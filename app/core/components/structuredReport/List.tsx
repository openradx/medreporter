import { ReactNode } from "react"

interface ListProps {
  children?: ReactNode
}

export const List = ({ children }: ListProps) => <ul>{children}</ul>