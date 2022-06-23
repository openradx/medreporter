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
  const md = useMediaQuery(
    `(min-width: ${theme.breakpoints.md}px) and (max-width: ${theme.breakpoints.xl}px)`,
    false
  )
  const screenSize = sm ? "sm" : md ? "md" : "lg"

  const height = structuredReport && screenSize !== "sm" ? "100vh" : undefined

  return (
    <ScreenContextProvider value={{ screenSize }}>
      <AppShell styles={{ main: { height } }} padding="sm" header={<PageHeader />}>
        {children}
      </AppShell>
    </ScreenContextProvider>
  )
}
