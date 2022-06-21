import { AppShell } from "@mantine/core"
import { ReactNode } from "react"
import { PageHeader } from "./PageHeader"

interface MainLayoutProps {
  children: ReactNode
}

export const MainLayout = ({ children }: MainLayoutProps) => (
  <AppShell styles={{ main: { height: "100vh" } }} padding="sm" header={<PageHeader />}>
    {children}
  </AppShell>
)
