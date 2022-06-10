import { AppShell } from "@mantine/core"
import { ReactNode } from "react"
import { PageHeader } from "./PageHeader"

const links: { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  { label: "Tools", href: "/tools" },
]

interface MainLayoutProps {
  children: ReactNode
}

export const MainLayout = ({ children }: MainLayoutProps) => (
  <AppShell header={<PageHeader links={links} />}>{children}</AppShell>
)
