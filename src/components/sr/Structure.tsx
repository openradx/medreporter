import { Box, Paper } from "@mantine/core"
import { useSiteTranslation } from "../../hooks/useSiteTranslation"
import { ClearButton } from "./ClearButton"
import { PanelHeader } from "./PanelHeader"
import { RedoButton } from "./RedoButton"
import { StructureLanguageSelector } from "./StructureLanguageSelector"
import { UndoButton } from "./UndoButton"

export const Structure = () => {
  const { t } = useSiteTranslation()

  return (
    <Paper sx={{ flexGrow: 1 }} shadow="sm" withBorder>
      <PanelHeader
        title={t("Structure.title")}
        centerIcons={
          <>
            <ClearButton />
            <UndoButton />
            <RedoButton />
          </>
        }
        rightIcons={<StructureLanguageSelector />}
      />
      <Box sx={(theme) => ({ padding: theme.spacing.sm })}>Structure form</Box>
    </Paper>
  )
}
