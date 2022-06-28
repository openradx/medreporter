import { Box, MediaQuery, Paper, ScrollArea } from "@mantine/core"
import { ReactNode } from "react"
import { useSiteTranslation } from "../../hooks/useSiteTranslation"
import { ActionsGroup } from "../common/ActionsGroup"
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
    <MediaQuery largerThan="xl" styles={{ flex: "1.5 1 0" }}>
      <Paper
        className="medreporter-StructurePanel-root"
        sx={{
          flex: "1 1 0",
          display: "flex",
          flexDirection: "column",
        }}
        shadow="sm"
        withBorder
      >
        <StructureForm>
          <PanelHeader
            title={t("Structure.title")}
            actions={
              <ActionsGroup sx={{ flexGrow: 1, justifyContent: "center" }}>
                <ClearButton />
                <UndoButton />
                <RedoButton />
                <StructureLanguageSelector />
              </ActionsGroup>
            }
          />
          <ScrollArea className="medreporter-StructurePanel-content" sx={{ flexGrow: 1 }}>
            <Box sx={(theme) => ({ padding: theme.spacing.sm })}>{children}</Box>
          </ScrollArea>
        </StructureForm>
      </Paper>
    </MediaQuery>
  )
}
