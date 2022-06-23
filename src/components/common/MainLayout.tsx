import { AppShell, MediaQuery } from "@mantine/core"
import { ReactNode } from "react"
import { PageHeader } from "./PageHeader"

interface MainLayoutProps {
  structuredReport?: boolean
  children: ReactNode
}

export const MainLayout = ({ structuredReport = false, children }: MainLayoutProps) => (
  <MediaQuery largerThan="sm" styles={{ main: { height: structuredReport ? "100vh" : undefined } }}>
    <AppShell padding="sm" header={<PageHeader />}>
      {children}
    </AppShell>
  </MediaQuery>
)
