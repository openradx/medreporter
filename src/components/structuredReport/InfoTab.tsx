import { Tabs } from "@mantine/core"
import { ReactNode } from "react"

interface InfoTabProp {
  title: string
  children: ReactNode
}

export const InfoTab = ({ title, children }: InfoTabProp) => (
  <Tabs.Panel value={title}>{children}</Tabs.Panel>
)
