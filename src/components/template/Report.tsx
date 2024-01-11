import { Center, Loader, Paper, ScrollArea, Stack } from "@mantine/core"
import { ReactNode } from "react"
import { REPORT_CONTENT_ID } from "~/constants"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { selectDataInitialized } from "~/state/displaySlice"
import { useAppSelector } from "~/state/store"
import { ActionsGroup } from "../common/ActionsGroup"
import { CopyButton } from "./CopyButton"
import { OutputFormat } from "./OutputFormat"
import { PanelToolbar } from "./PanelToolbar"
import classes from "./Report.module.css"
import { ReportLanguageChooser } from "./ReportLanguageChooser"

interface ReportProps {
  actions?: ReactNode
  children?: ReactNode
  isDesigning?: boolean
}

export const Report = ({ actions, children, isDesigning = false }: ReportProps) => {
  const { t } = useSiteTranslation()
  const dataInitialized = useAppSelector(selectDataInitialized)

  return (
    <Paper
      style={{
        flex: "1 1 0",
        display: "flex",
        flexDirection: "column",
      }}
      shadow="sm"
      withBorder
    >
      <PanelToolbar
        title={t("Report.title")}
        actions={
          actions || (
            <ActionsGroup grow>
              <CopyButton />
              <OutputFormat />
              <ReportLanguageChooser />
            </ActionsGroup>
          )
        }
      />
      {!dataInitialized && !isDesigning && (
        <Center style={{ flexGrow: 1 }}>
          <Loader type="bars" />
        </Center>
      )}
      {dataInitialized && !isDesigning && (
        <ScrollArea>
          <Stack
            id={REPORT_CONTENT_ID}
            h="100%"
            ff="monospace"
            p="sm"
            style={{ whiteSpace: "pre-wrap", flexGrow: 1 }}
          >
            {children}
          </Stack>
        </ScrollArea>
      )}
      {isDesigning && (
        <ScrollArea h="100%" className={classes.designerReport}>
          {children}
        </ScrollArea>
      )}
    </Paper>
  )
}
