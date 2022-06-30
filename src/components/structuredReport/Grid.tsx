import { Grid as MantineGrid } from "@mantine/core"
import { ReactNode } from "react"
import { GridItem } from "./GridItem"

interface GridProps {
  children: ReactNode
}

export const Grid = ({ children }: GridProps) => <MantineGrid>{children}</MantineGrid>

Grid.Item = GridItem
