import { Box } from "@mantine/core"
import { ReactNode } from "react"
import { useStructuredReport } from "../../contexts/StructuredReportContext"
import { selectReportFormat } from "../../state/displaySlice"
import { useAppSelector } from "../../state/store"

interface ListItemProps {
  children?: ReactNode
}

export const ListItem = ({ children }: ListItemProps) => {
  const { context } = useStructuredReport()
  const reportFormat = useAppSelector(selectReportFormat)
  const isTextFormat = context === "report" && reportFormat === "text"

  return (
    <Box component="li">
      {isTextFormat && "- "}
      {children}
    </Box>
  )
}
