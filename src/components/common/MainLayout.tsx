import { AppShell, Container, MantineNumberSize, MediaQuery } from "@mantine/core"
import { ReactNode } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { MainLayoutFallback } from "./MainLayoutFallback"
import { Navbar } from "./Navbar"

interface MainLayoutProps {
  size?: "full" | MantineNumberSize
  children: ReactNode
  withAccountControl?: boolean
}

export const MainLayout = ({
  size = "lg",
  children,
  withAccountControl = true,
}: MainLayoutProps) => (
  <MediaQuery largerThan="sm" styles={{ main: { height: size === "full" ? "100vh" : undefined } }}>
    <AppShell padding="sm" header={<Navbar withAccountControl={withAccountControl} />}>
      <ErrorBoundary FallbackComponent={MainLayoutFallback}>
        {size === "full" && children}
        {size !== "full" && <Container size={size}>{children}</Container>}
      </ErrorBoundary>
    </AppShell>
  </MediaQuery>
)
