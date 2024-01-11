import { Flex, Paper } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks"
import { ReactNode } from "react"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { ActionsGroup } from "../common/ActionsGroup"
import { PreviewSwitch } from "../designer/PreviewSwitch"
import { TemplatePropertiesButton } from "../designer/TemplatePropertiesButton"
import { ClearAllButton } from "./ClearAllButton"
import { PanelToolbar } from "./PanelToolbar"
import { RedoButton } from "./RedoButton"
import { StructureForm } from "./StructureForm"
import { StructureLanguageChooser } from "./StructureLanguageChooser"
import { UndoButton } from "./UndoButton"

interface StructureProps {
  actions?: ReactNode
  children?: ReactNode
}

export const Structure = ({ actions, children }: StructureProps) => {
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
        <Flex component="form" pos="relative" h="100%" direction="column">
          <PanelToolbar
            title={t("Structure.title")}
            actions={
              actions || (
                <ActionsGroup grow>
                  <ClearAllButton />
                  <UndoButton />
                  <RedoButton />
                  <PreviewSwitch />
                  <TemplatePropertiesButton />
                  <StructureLanguageChooser />
                </ActionsGroup>
              )
            }
          />
          {children}
        </Flex>
      </StructureForm>
    </Paper>
  )
}
