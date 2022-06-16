import { Box, Text } from "@mantine/core"
import { ReactNode } from "react"
import { useStructuredReport } from "../../contexts/StructuredReportContext"
import { useReportTranslation } from "../../hooks/useReportTranslation"

interface ConclusionsProps {
  children?: ReactNode
}

export const Conclusions = ({ children }: ConclusionsProps) => {
  const { context } = useStructuredReport()
  const { t } = useReportTranslation()

  if (context === "structure") return null

  return (
    <Box>
      <Text>{t("Conclusions.title")}:</Text>
      {children}
    </Box>
  )
}
