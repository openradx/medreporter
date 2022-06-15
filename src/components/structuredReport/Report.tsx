import { ReactNode } from "react"
import { useStructuredReport } from "../../contexts/StructuredReportContext"

interface ReportProps {
  children: ReactNode
}

export const Report = ({ children }: ReportProps) => {
  const { context } = useStructuredReport()

  if (context === "structure") return null

  return <>{children}</>
}
