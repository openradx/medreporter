import { Box, Paper, ScrollArea } from "@mantine/core"
import { ReactNode } from "react"
import { useSiteTranslation } from "../../hooks/useSiteTranslation"
import { ClearButton } from "./ClearButton"
import { InfoButton } from "./InfoButton"
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
          actions={
            <>
              <ClearButton />
              <UndoButton />
              <RedoButton />
              <InfoButton />
              <StructureLanguageSelector />
            </>
          }
        />
        <ScrollArea className="medreporter-StructurePanel-content" sx={{ flexGrow: 1 }}>
          <Box sx={(theme) => ({ padding: theme.spacing.sm })}>{children}</Box>
        </ScrollArea>
      </StructureForm>
    </Paper>
  )
}
