import { Box, Paper, ScrollArea } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks"
import { ReactNode } from "react"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { ActionsGroup } from "../common/ActionsGroup"
import { ClearStructureButton } from "./ClearStructureButton"
import { PanelToolbar } from "./PanelToolbar"
import { RedoButton } from "./RedoButton"
import classes from "./Structure.module.css"
import { StructureForm } from "./StructureForm"
import { StructureLanguageChooser } from "./StructureLanguageChooser"
import { UndoButton } from "./UndoButton"

interface StructureProps {
  children?: ReactNode
}

export const Structure = ({ children }: StructureProps) => {
  const { t } = useSiteTranslation()
  const matches = useMediaQuery("(min-width: 88em)")

  return (
    <Paper
      style={{
        flex: matches ? "1.5 1 0" : "1 1 0",
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
            <ActionsGroup grow>
              <ClearStructureButton />
              <UndoButton />
              <RedoButton />
              <StructureLanguageChooser />
            </ActionsGroup>
          }
        />
        <ScrollArea className={classes.structure}>
          <Box p="sm">{children}</Box>
        </ScrollArea>
      </StructureForm>
    </Paper>
  )
}
