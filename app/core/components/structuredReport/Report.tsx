import { Box } from "@mantine/core"
import { cloneElement, isValidElement, ReactNode } from "react"
import flattenChildren from "react-keyed-flatten-children"
import { REPORT_CONTENT_ID } from "../../constants/general"
import { useStructuredReport } from "../../contexts/StructuredReportContext"
import { Paragraph } from "./Paragraph"

interface ReportProps {
  children?: ReactNode
}

export const Report = ({ children }: ReportProps) => {
  const { context } = useStructuredReport()

  if (context === "structure") return null

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        whiteSpace: "pre-wrap",
        fontFamily: "monospace",
      }}
    >
      <div id={REPORT_CONTENT_ID}>
        {flattenChildren(children).map((child, index, array) => {
          if (isValidElement(child) && child.type === Paragraph) {
            return cloneElement(child, { last: index === array.length - 1 })
          }
          return child
        })}
      </div>
    </Box>
  )
}
