import { Box, Center, Loader, Paper, ScrollArea } from "@mantine/core"
import { ReactNode } from "react"
import { REPORT_CONTENT_ID } from "~/constants"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
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

  return (
    <Paper
      sx={{
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
          <ActionsGroup sx={{ flexGrow: 1, justifyContent: "center" }}>
            <CopyButton />
            <OutputFormat />
            <ReportLanguageChooser />
          </ActionsGroup>
        }
      />
      {!dataInitialized && (
        <Center sx={{ flexGrow: 1 }}>
          <Loader variant="bars" />
        </Center>
      )}
      {dataInitialized && (
        <ScrollArea sx={{ flexGrow: 1 }}>
          <Box
            id={REPORT_CONTENT_ID}
            sx={(theme) => ({
              padding: theme.spacing.sm,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              whiteSpace: "pre-wrap",
              fontFamily: "monospace",
            })}
          >
            {children}
          </Box>
        </ScrollArea>
      )}
    </Paper>
  )
}
