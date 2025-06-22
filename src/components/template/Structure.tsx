import { useLingui } from "@lingui/react/macro"
import { Flex, Paper } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks"
import { ReactNode, useRef } from "react"
import { StructureContextProvider } from "~/contexts/StructureContext"
import { StructureData } from "~/schemas/structure"
import { selectViewMode } from "~/state/displaySlice"
import { useAppSelector } from "~/state/store"
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
  const { t } = useLingui()
  const matches = useMediaQuery("(min-width: 68em)")
  const viewMode = useAppSelector(selectViewMode)
  const defaultValuesRef = useRef<StructureData>({})
  const backupValuesRef = useRef<StructureData>({})

  return (
    <Paper
      style={{
        width: matches ? "59%" : "100%",
        height: matches ? "100%" : "50%",
        display: "flex",
        flexDirection: "column",
        opacity: viewMode === "structure" ? 1 : 0.5,
      }}
      shadow={viewMode === "structure" ? "xl" : "sm"}
      withBorder
    >
      <StructureContextProvider value={{ defaultValuesRef, backupValuesRef }}>
        <Flex component="form" pos="relative" h="100%" direction="column">
          <PanelToolbar
            title={t`Structure`}
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
