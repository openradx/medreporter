import { Box, Paper, ScrollArea } from "@mantine/core"
import { ReactNode } from "react"
import { useScreen } from "../../contexts/ScreenContext"
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
  const { screenSize } = useScreen()

  return (
    <Paper
      className="medreporter-StructurePanel-root"
      sx={{
        flex: screenSize === "lg" ? "1.5 1 0" : "1 1 0",
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
            <>
              <ClearButton />
              <UndoButton />
              <RedoButton />
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
