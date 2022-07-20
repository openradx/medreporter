import { Box } from "@mantine/core"
import { ReactNode } from "react"
import { selectReportFormat } from "../../state/displaySlice"
import { useAppSelector } from "../../state/store"

interface ParagraphProps {
  children?: ReactNode
}

export const Paragraph = ({ children }: ParagraphProps) => {
  const reportFormat = useAppSelector(selectReportFormat)

  if (reportFormat === "text") {
    return <>{children}</>
  }

  return (
    <Box className="medreporter-Paragraph-root" sx={{ display: "flex", flexDirection: "column" }}>
      {children}
    </Box>
  )
}
