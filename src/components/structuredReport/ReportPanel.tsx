import { Box, Paper } from "@mantine/core"
import { ReactNode } from "react"
import { useSiteTranslation } from "../../hooks/useSiteTranslation"
import { selectDataInitialized } from "../../state/displaySlice"
import { useAppSelector } from "../../state/store"
import { PanelHeader } from "./PanelHeader"
import { ReportLanguageSelector } from "./ReportLanguageSelector"

interface ReportPanelProps {
  children?: ReactNode
}

export const ReportPanel = ({ children }: ReportPanelProps) => {
  const { t } = useSiteTranslation()

  const dataInitialized = useAppSelector(selectDataInitialized)

  return (
    <Paper sx={{ flexGrow: 1, maxWidth: 1000 }} shadow="sm" withBorder>
      <PanelHeader title={t("Report.title")} rightIcons={<ReportLanguageSelector />} />
      <Box sx={(theme) => ({ padding: theme.spacing.sm })}>
        {!dataInitialized && "dlkfjdlkj"}
        {dataInitialized && children}
      </Box>
    </Paper>
  )
}
