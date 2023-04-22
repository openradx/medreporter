import { AppShell, Container, MantineNumberSize, MediaQuery } from "@mantine/core"
import { ReactNode } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { SmallFooter } from "../sr/SmallFooter"
import { MainLayoutFallback } from "./MainLayoutFallback"
import { Navbar } from "./Navbar"

interface MainLayoutProps {
  size?: "full" | MantineNumberSize
  withoutAccountControl?: boolean
  footerSize?: "small" | "tall"
  children: ReactNode
}

export const MainLayout = ({
  size = "lg",
  withoutAccountControl,
  children,
  footerSize,
}: MainLayoutProps) => (
  <MediaQuery largerThan="sm" styles={{ main: { height: size === "full" ? "100vh" : undefined } }}>
    <AppShell
      padding="sm"
      header={<Navbar withoutAccountControl={withoutAccountControl} />}
      footer={footerSize === "small" ? <SmallFooter /> : undefined}
    >
      <ErrorBoundary FallbackComponent={MainLayoutFallback}>
        <Container size={size !== "full" ? size : undefined} fluid={size === "full"} h="100%">
          {children}
        </Container>
      </ErrorBoundary>
    </AppShell>
  </MediaQuery>
)
