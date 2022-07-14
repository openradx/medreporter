import { AppShell, Container, MediaQuery } from "@mantine/core"
import { ReactNode } from "react"
import { PageHeader } from "./PageHeader"

interface MainLayoutProps {
  fullScreen?: boolean
  children: ReactNode
}

export const MainLayout = ({ fullScreen = false, children }: MainLayoutProps) => (
  <MediaQuery largerThan="sm" styles={{ main: { height: fullScreen ? "100vh" : undefined } }}>
    <AppShell padding="sm" header={<PageHeader />}>
      {fullScreen && children}
      {!fullScreen && <Container size="lg">{children}</Container>}
    </AppShell>
  </MediaQuery>
)
