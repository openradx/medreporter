import { Box } from "@mantine/core"
import { ReactNode } from "react"
import { selectReportFormat } from "../../state/displaySlice"
import { useAppSelector } from "../../state/store"

interface ListProps {
  children?: ReactNode
}

export const List = ({ children }: ListProps) => {
  const reportFormat = useAppSelector(selectReportFormat)

  return (
    <Box
      component="ul"
      sx={{
        margin: 0,
        padding: 0,
        paddingLeft: reportFormat === "html" ? 18 : 0,
        listStyleType: reportFormat === "html" ? "square" : "none",
      }}
    >
      {children}
    </Box>
  )
}
