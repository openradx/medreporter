import { Box, Paper } from "@mantine/core"
import { useSiteTranslation } from "../../hooks/useSiteTranslation"
import { PanelHeader } from "./PanelHeader"
import { ReportLanguageSelector } from "./ReportLanguageSelector"

export const Report = () => {
  const { t } = useSiteTranslation()

  return (
    <Paper sx={{ flexGrow: 1, maxWidth: 1000 }} shadow="sm" withBorder>
      <PanelHeader title={t("Report.title")} rightIcons={<ReportLanguageSelector />} />
      <Box sx={(theme) => ({ padding: theme.spacing.sm })}>Report content</Box>
    </Paper>
  )
}
