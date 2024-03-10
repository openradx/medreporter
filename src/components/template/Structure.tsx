import { Flex, Paper } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks"
import { ReactNode, useRef } from "react"
import { StructureContextProvider } from "~/contexts/StructureContext"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { StructureData } from "~/schemas/structure"
import { ActionsGroup } from "../common/ActionsGroup"
import { ClearAllButton } from "./ClearAllButton"
import { PanelToolbar } from "./PanelToolbar"
import { RedoButton } from "./RedoButton"
import { StructureLanguageChooser } from "./StructureLanguageChooser"
import { UndoButton } from "./UndoButton"

interface StructureProps {
  actions?: ReactNode
  children?: ReactNode
}

export const Structure = ({ actions, children }: StructureProps) => {
  const { t } = useSiteTranslation()
  const matches = useMediaQuery("(min-width: 88em)")
  const defaultValuesRef = useRef<StructureData>({})

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
      <StructureContextProvider value={{ defaultValuesRef }}>
        <Flex component="form" pos="relative" h="100%" direction="column">
          <PanelToolbar
            title={t("Structure.title")}
            actions={
              actions || (
                <ActionsGroup grow>
                  <ClearAllButton />
                  <UndoButton />
                  <RedoButton />
                  <StructureLanguageChooser />
                </ActionsGroup>
              )
            }
          />
          {children}
        </Flex>
      </StructureContextProvider>
    </Paper>
  )
}
