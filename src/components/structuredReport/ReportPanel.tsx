import { Box, Center, Loader, Paper, ScrollArea } from "@mantine/core"
import { ReactNode } from "react"
import { useScreen } from "../../contexts/ScreenContext"
import { useSiteTranslation } from "../../hooks/useSiteTranslation"
import { selectDataInitialized } from "../../state/displaySlice"
import { useAppSelector } from "../../state/store"
import { PanelHeader } from "./PanelHeader"
import { ReportLanguageSelector } from "./ReportLanguageSelector"

interface ReportPanelProps {
  children?: ReactNode
}

export const ReportPanel = ({ children }: ReportPanelProps) => {
  const { t } = useSiteTranslation()
  const { screenSize } = useScreen()
  const dataInitialized = useAppSelector(selectDataInitialized)

  return (
    <Paper
      className="medreporter-ReportPanel-root"
      sx={{
        flexGrow: 1,
        width: screenSize === "lg" ? "30vw" : "auto",
        display: "flex",
        flexDirection: "column",
      }}
      shadow="sm"
      withBorder
    >
      <PanelHeader title={t("Report.title")} rightIcons={<ReportLanguageSelector />} />
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
