import { Box } from "@mantine/core"
import { ReactNode } from "react"
import { selectReportFormat } from "../../state/displaySlice"
import { useAppSelector } from "../../state/store"

interface ListItemProps {
  children?: ReactNode
}

export const ListItem = ({ children }: ListItemProps) => {
  const reportFormat = useAppSelector(selectReportFormat)

  return (
    <Box component="li">
      {reportFormat === "text" && "- "}
      {children}
    </Box>
  )
}
