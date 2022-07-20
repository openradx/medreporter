import { Box } from "@mantine/core"
import { ReactNode } from "react"
import { useStructuredReport } from "../../contexts/StructuredReportContext"
import { selectReportFormat } from "../../state/displaySlice"
import { useAppSelector } from "../../state/store"

interface ReportProps {
  children: ReactNode
}

export const Report = ({ children }: ReportProps) => {
  const { context } = useStructuredReport()
  const reportFormat = useAppSelector(selectReportFormat)

  if (context === "structure") return null

  if (reportFormat === "text") {
    return <pre>{children}</pre>
  }

  // html
  return <Box sx={{ display: "flex", flexDirection: "column" }}>{children}</Box>
}
