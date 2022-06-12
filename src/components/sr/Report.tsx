import { Box, Paper } from "@mantine/core"
import { useSiteTranslation } from "../../hooks/useSiteTranslation"
import { PanelHeader } from "./PanelHeader"

export const Report = () => {
  const { t } = useSiteTranslation()

  return (
    <Paper sx={{ flexGrow: 1, maxWidth: 1000 }} shadow="sm" withBorder>
      <PanelHeader title={t("Report.title")} />
      <Box sx={(theme) => ({ padding: theme.spacing.sm })}>lkdsjf</Box>
    </Paper>
  )
}
