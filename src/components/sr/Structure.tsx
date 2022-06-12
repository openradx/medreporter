import { Box, Paper } from "@mantine/core"
import { useSiteTranslation } from "../../hooks/useSiteTranslation"
import { ClearButton } from "./ClearButton"
import { PanelHeader } from "./PanelHeader"
import { RedoButton } from "./RedoButton"
import { StructureForm } from "./StructureForm"
import { StructureLanguageSelector } from "./StructureLanguageSelector"
import { UndoButton } from "./UndoButton"

export const Structure = () => {
  const { t } = useSiteTranslation()

  return (
    <Paper sx={{ flexGrow: 1 }} shadow="sm" withBorder>
      <StructureForm>
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
      </StructureForm>
    </Paper>
  )
}
