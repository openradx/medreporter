import { Box, Paper } from "@mantine/core"
import { ReactNode } from "react"
import { useSiteTranslation } from "../../hooks/useSiteTranslation"
import { ClearButton } from "./ClearButton"
import { PanelHeader } from "./PanelHeader"
import { RedoButton } from "./RedoButton"
import { StructureForm } from "./StructureForm"
import { StructureLanguageSelector } from "./StructureLanguageSelector"
import { UndoButton } from "./UndoButton"

interface StructureProps {
  children: ReactNode
}

export const Structure = ({ children }: StructureProps) => {
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
        <Box
          className="medreporter-Structure-body"
          sx={(theme) => ({ padding: theme.spacing.sm, height: "100%" })}
        >
          {children}
        </Box>
      </StructureForm>
    </Paper>
  )
}
