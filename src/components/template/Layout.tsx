import { Flex } from "@mantine/core"
import { ReactNode } from "react"

interface LayoutProps {
  direction?: "row" | "column"
  justify?: "start" | "center" | "end" | "space-between" | "space-around"
  nowrap?: boolean
  children: ReactNode
}

export const Layout = ({ direction, justify, nowrap, children }: LayoutProps) => (
  <Flex direction={direction} justify={justify} wrap={nowrap ? "nowrap" : "wrap"}>
    {children}
  </Flex>
)
