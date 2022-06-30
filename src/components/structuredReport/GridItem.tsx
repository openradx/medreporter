import { ColProps, Grid } from "@mantine/core"
import { ReactNode } from "react"

interface GridItemProps {
  size?: "lg" | "md" | "sm"
  children: ReactNode
}

export const GridItem = ({ size = "sm", children }: GridItemProps) => {
  let spans: ColProps = { xs: 12, md: 6, xl: 4 } // sm
  if (size === "md") {
    spans = { xs: 12, md: 12, xl: 6 }
  } else if (size === "lg") {
    spans = { xs: 12 }
  }

  return <Grid.Col {...spans}>{children}</Grid.Col>
}
