import { AppShell } from "@mantine/core"
import { ReactNode } from "react"
import { PageHeader } from "./PageHeader"

interface MainLayoutProps {
  children: ReactNode
}

export const MainLayout = ({ children }: MainLayoutProps) => (
  <AppShell header={<PageHeader links={[{ label: "foo", link: "bar" }]} />}>{children}</AppShell>
)
