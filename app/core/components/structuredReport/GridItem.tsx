import { ColProps, Grid } from "@mantine/core"
import { ReactNode } from "react"

interface GridItemProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  children: ReactNode
}

export const GridItem = ({ size = "sm", children }: GridItemProps) => {
  let spans: ColProps = { xs: 12, md: 2, xl: 1 } // xs
  if (size === "sm") {
    spans = { xs: 12, md: 4, xl: 2 }
  } else if (size === "md") {
    spans = { xs: 12, md: 6, xl: 4 }
  } else if (size === "lg") {
    spans = { xs: 12, md: 12, xl: 6 }
  } else if (size === "xl") {
    spans = { xs: 12 }
  }

  return <Grid.Col {...spans}>{children}</Grid.Col>
}
