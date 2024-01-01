import { Center, Flex, Loader, Paper, ScrollArea } from "@mantine/core"
import { ReactNode } from "react"
import { REPORT_CONTENT_ID } from "~/constants"
import { useIsDesigning } from "~/hooks/useIsDesigning"
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
}

export const Report = ({ actions, children }: ReportProps) => {
  const { t } = useSiteTranslation()
  const dataInitialized = useAppSelector(selectDataInitialized)
  const isDesigning = useIsDesigning()

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
      {(dataInitialized || isDesigning) && (
        <ScrollArea className={classes.report}>
          <Flex
            id={REPORT_CONTENT_ID}
            h="100%"
            direction="column"
            ff="monospace"
            p="sm"
            style={{ whiteSpace: "pre-wrap", flexGrow: 1 }}
          >
            {children}
          </Flex>
        </ScrollArea>
      )}
    </Paper>
  )
}
