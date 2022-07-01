import { Grid as MantineGrid } from "@mantine/core"
import { ReactNode } from "react"

interface GridProps {
  children: ReactNode
}

export const Grid = ({ children }: GridProps) => <MantineGrid>{children}</MantineGrid>
