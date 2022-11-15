import { AppShell, Container, MantineNumberSize, MediaQuery } from "@mantine/core"
import { ReactNode } from "react"
import { Navbar } from "./Navbar"

interface MainLayoutProps {
  size?: "full" | MantineNumberSize
  children: ReactNode
}

export const MainLayout = ({ size = "lg", children }: MainLayoutProps) => (
  <MediaQuery largerThan="sm" styles={{ main: { height: size === "full" ? "100vh" : undefined } }}>
    <AppShell padding="sm" header={<Navbar />}>
      {size === "full" && children}
      {size !== "full" && <Container size={size}>{children}</Container>}
    </AppShell>
  </MediaQuery>
)
