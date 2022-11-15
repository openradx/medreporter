import { Box, Center, Loader, Paper, ScrollArea } from "@mantine/core"
import { ReactNode } from "react"
import { useSiteTranslation } from "../../hooks/useSiteTranslation"
import { selectDataInitialized } from "../../state/displaySlice"
import { useAppSelector } from "../../state/store"
import { ActionsGroup } from "../common/ActionsGroup"
import { CopyButton } from "./CopyButton"
import { PanelToolbar } from "./PanelToolbar"
import { ReportFormat } from "./ReportFormat"
import { ReportLanguageChooser } from "./ReportLanguageChooser"

interface ReportPanelProps {
  children?: ReactNode
}

export const ReportPanel = ({ children }: ReportPanelProps) => {
  const { t } = useSiteTranslation()
  const dataInitialized = useAppSelector(selectDataInitialized)

  return (
    <Paper
      className="medreporter-ReportPanel-root"
      sx={{
        flex: "1 1 0",
        display: "flex",
        flexDirection: "column",
      }}
      shadow="sm"
      withBorder
    >
      <PanelToolbar
        title={t("ReportPanel.title")}
        actions={
          <ActionsGroup sx={{ flexGrow: 1, justifyContent: "center" }}>
            <CopyButton />
            <ReportFormat />
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
        <ScrollArea className="medreporter-ReportPanel-content" sx={{ flexGrow: 1 }}>
          <Box sx={(theme) => ({ padding: theme.spacing.sm, height: "100%" })}>{children}</Box>
        </ScrollArea>
      )}
    </Paper>
  )
}
