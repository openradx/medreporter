import { Box, Paper } from "@mantine/core"
import { useSiteTranslation } from "../../hooks/useSiteTranslation"
import { ClearButton } from "./ClearButton"
import { PanelHeader } from "./PanelHeader"
import { RedoButton } from "./RedoButton"
import { UndoButton } from "./UndoButton"

export const Structure = () => {
  const { t } = useSiteTranslation()

  return (
    <Paper sx={{ flexGrow: 1 }} shadow="sm" withBorder>
      <PanelHeader title={t("Structure.title")}>
        <ClearButton />
        <UndoButton />
        <RedoButton />
      </PanelHeader>
      <Box sx={(theme) => ({ padding: theme.spacing.sm })}>lkdsjf</Box>
    </Paper>
  )
}
