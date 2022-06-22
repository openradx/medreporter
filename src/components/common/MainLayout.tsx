import { AppShell, useMantineTheme } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks"
import { ReactNode } from "react"
import { ScreenContextProvider } from "../../contexts/ScreenContext"
import { PageHeader } from "./PageHeader"

interface MainLayoutProps {
  structuredReport?: boolean
  children: ReactNode
}

export const MainLayout = ({ structuredReport = false, children }: MainLayoutProps) => {
  const theme = useMantineTheme()
  const sm = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`, false)
  const screenSize = sm ? "sm" : "lg"

  const height = structuredReport ? "100vh" : undefined

  return (
    <ScreenContextProvider value={{ screenSize }}>
      <AppShell styles={{ main: { height } }} padding="sm" header={<PageHeader />}>
        {children}
      </AppShell>
    </ScreenContextProvider>
  )
}
