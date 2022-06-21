import { Box, Paper } from "@mantine/core"
import { ReactNode } from "react"
import { useSiteTranslation } from "../../hooks/useSiteTranslation"
import { ClearButton } from "./ClearButton"
import { PanelHeader } from "./PanelHeader"
import { RedoButton } from "./RedoButton"
import { StructureForm } from "./StructureForm"
import { StructureLanguageSelector } from "./StructureLanguageSelector"
import { UndoButton } from "./UndoButton"

interface StructurePanelProps {
  children: ReactNode
}

export const StructurePanel = ({ children }: StructurePanelProps) => {
  const { t } = useSiteTranslation()

  return (
    <Paper
      className="medreporter-StructurePanel-root"
      sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
      shadow="sm"
      withBorder
    >
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
        <Box
          className="medreporter-StructurePanel-content"
          sx={(theme) => ({ flexGrow: 1, padding: theme.spacing.sm, overflow: "auto" })}
        >
          {children}
        </Box>
      </StructureForm>
    </Paper>
  )
}
