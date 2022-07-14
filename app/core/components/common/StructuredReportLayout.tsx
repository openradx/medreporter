import { ReactNode } from "react"
import { MainLayout } from "./MainLayout"

interface StructuredReportLayoutProps {
  children: ReactNode
}

export const StructuredReportLayout = ({ children }: StructuredReportLayoutProps) => (
  <MainLayout fullScreen>{children}</MainLayout>
)
