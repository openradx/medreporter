import { AppShell, Container, MantineSize } from "@mantine/core"
import { ReactNode } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { BackgroundImage } from "./BackgroundImage"
import { MainLayoutFallback } from "./MainLayoutFallback"
import { Navbar } from "./Navbar"
import { SmallFooter } from "./SmallFooter"
import { TallFooter } from "./TallFooter"

interface MainLayoutProps {
  size?: "full" | MantineSize
  withoutAccountControl?: boolean
  footerSize?: "small" | "tall" | "none"
  backgroundImage?: boolean
  children: ReactNode
}

export const MainLayout = ({
  size = "lg",
  withoutAccountControl,
  children,
  footerSize = "tall",
  backgroundImage = false,
}: MainLayoutProps) => (
  <AppShell
    padding="sm"
    header={{ height: 60 }}
    footer={{ height: 30 }}
    styles={{ main: { height: "100vh" } }}
  >
    <Navbar withoutAccountControl={withoutAccountControl} />
    <AppShell.Main pb={footerSize === "small" ? 30 : undefined}>
      {backgroundImage && <BackgroundImage />}
      <ErrorBoundary FallbackComponent={MainLayoutFallback}>
        <Container size={size !== "full" ? size : undefined} fluid={size === "full"} h="100%">
          {children}
          {footerSize === "tall" && <TallFooter />}
        </Container>
      </ErrorBoundary>
    </AppShell.Main>
    {footerSize === "small" ? <SmallFooter /> : undefined}
  </AppShell>
)
