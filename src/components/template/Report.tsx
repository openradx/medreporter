import { Center, Flex, Loader, Paper, ScrollArea } from "@mantine/core"
import { ReactNode } from "react"
import { REPORT_CONTENT_ID } from "~/constants"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { selectEditing } from "~/state/designerSlice"
import { selectDataInitialized } from "~/state/displaySlice"
import { useAppSelector } from "~/state/store"
import { ActionsGroup } from "../common/ActionsGroup"
import { CopyButton } from "./CopyButton"
import { OutputFormat } from "./OutputFormat"
import { PanelToolbar } from "./PanelToolbar"
import { ReportLanguageChooser } from "./ReportLanguageChooser"

interface ReportProps {
  children?: ReactNode
}

export const Report = ({ children }: ReportProps) => {
  const { t } = useSiteTranslation()
  const dataInitialized = useAppSelector(selectDataInitialized)

  const editing = useAppSelector(selectEditing)
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
          <ActionsGroup grow>
            <CopyButton />
            <OutputFormat />
            <ReportLanguageChooser />
          </ActionsGroup>
        }
      />
      {!dataInitialized && !editing && (
        <Center style={{ flexGrow: 1 }}>
          <Loader type="bars" />
        </Center>
      )}
      {(dataInitialized || editing) && (
        <ScrollArea style={{ flexGrow: 1 }}>
          <Flex
            id={REPORT_CONTENT_ID}
            h="100%"
            direction="column"
            ff="monospace"
            p="sm"
            style={{ whiteSpace: "pre-wrap" }}
          >
            {children}
          </Flex>
        </ScrollArea>
      )}
    </Paper>
  )
}
