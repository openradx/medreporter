import { Box } from "@mantine/core"
import { ReactNode } from "react"
import { useStructuredReport } from "../../contexts/StructuredReportContext"
import { selectReportFormat } from "../../state/displaySlice"
import { useAppSelector } from "../../state/store"

interface ListProps {
  children?: ReactNode
}

export const List = ({ children }: ListProps) => {
  const { context } = useStructuredReport()
  const reportFormat = useAppSelector(selectReportFormat)
  const reportText = context === "report" && reportFormat === "text"

  return (
    <Box
      component="ul"
      sx={{
        margin: 0,
        padding: 0,
        paddingLeft: !reportText ? 18 : 0,
        listStyleType: !reportText ? "square" : "none",
      }}
    >
      {children}
    </Box>
  )
}
