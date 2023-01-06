import { Box } from "@mantine/core"
import { ReactNode } from "react"

interface InfoTabProp {
  title: string
  children: ReactNode
}

// "title" prop is read in in InfoModal
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const InfoTab = ({ title, children }: InfoTabProp) => <Box>{children}</Box>
