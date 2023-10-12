import { Box, MediaQuery, Paper, ScrollArea } from "@mantine/core"
import { ReactNode } from "react"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { ActionsGroup } from "../common/ActionsGroup"
import { ClearStructureButton } from "./ClearStructureButton"
import { PanelToolbar } from "./PanelToolbar"
import { RedoButton } from "./RedoButton"
import { StructureForm } from "./StructureForm"
import { StructureLanguageChooser } from "./StructureLanguageChooser"
import { UndoButton } from "./UndoButton"

interface StructureProps {
  children?: ReactNode
}

export const Structure = ({ children }: StructureProps) => {
  const { t } = useSiteTranslation()

  return (
    <MediaQuery largerThan="xl" styles={{ flex: "1.5 1 0" }}>
      <Paper
        sx={{
          flex: "1 1 0",
          display: "flex",
          flexDirection: "column",
        }}
        shadow="sm"
        withBorder
      >
        <StructureForm>
          <PanelToolbar
            title={t("Structure.title")}
            actions={
              <ActionsGroup sx={{ flexGrow: 1, justifyContent: "center" }}>
                <ClearStructureButton />
                <UndoButton />
                <RedoButton />
                <StructureLanguageChooser />
              </ActionsGroup>
            }
          />
          <ScrollArea sx={{ flexGrow: 1 }}>
            <Box sx={(theme) => ({ padding: theme.spacing.sm })}>{children}</Box>
          </ScrollArea>
        </StructureForm>
      </Paper>
    </MediaQuery>
  )
}
