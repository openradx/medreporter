import { Box } from "@mantine/core"
import { ReactNode } from "react"
import { REPORT_CONTENT_ID } from "~/constants"
import { useStructuredReport } from "~/contexts/StructuredReportContext"

interface ReportProps {
  children?: ReactNode
}

export const Report = ({ children }: ReportProps) => {
  const { context } = useStructuredReport()

  if (context === "structure") return null

  return (
    <Box
      id={REPORT_CONTENT_ID}
      sx={{
        display: "flex",
        flexDirection: "column",
        whiteSpace: "pre-wrap",
        fontFamily: "monospace",
      }}
    >
      {children}
    </Box>
  )
}
