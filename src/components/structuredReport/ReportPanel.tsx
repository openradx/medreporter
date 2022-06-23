import { Box, Center, Loader, Paper, ScrollArea } from "@mantine/core"
import { ReactNode } from "react"
import { REPORT_CONTENT_ID } from "../../constants/general"
import { useSiteTranslation } from "../../hooks/useSiteTranslation"
import { selectDataInitialized } from "../../state/displaySlice"
import { useAppSelector } from "../../state/store"
import { CopyButton } from "./CopyButton"
import { PanelHeader } from "./PanelHeader"
import { ReportLanguageSelector } from "./ReportLanguageSelector"

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
      <PanelHeader
        title={t("Report.title")}
        actions={
          <>
            <CopyButton />
            <ReportLanguageSelector />
          </>
        }
      />
      {!dataInitialized && (
        <Center sx={{ flexGrow: 1 }}>
          <Loader variant="bars" />
        </Center>
      )}
      {dataInitialized && (
        <ScrollArea className="medreporter-ReportPanel-content" sx={{ flexGrow: 1 }}>
          <Box sx={(theme) => ({ padding: theme.spacing.sm, height: "100%" })}>
            <Box id={REPORT_CONTENT_ID}>{children}</Box>
          </Box>
        </ScrollArea>
      )}
    </Paper>
  )
}
