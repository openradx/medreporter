import { Box, Center, Loader, Paper } from "@mantine/core"
import { ReactNode } from "react"
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

  const dataInitialized = useAppSelector(selectDataInitialized)

  return (
    <Paper
      className="medreporter-ReportPanel-root"
      sx={{ flexGrow: 1, maxWidth: "30vw", display: "flex", flexDirection: "column" }}
      shadow="sm"
      withBorder
    >
      <PanelHeader title={t("Report.title")} rightIcons={<ReportLanguageSelector />} />
      <Box
        className="medreporter-ReportPanel-content"
        sx={(theme) => ({
          flexGrow: 1,
          padding: theme.spacing.sm,
          minHeight: 0,
          overflowY: "auto",
        })}
      >
        {!dataInitialized && (
          <Center>
            <Loader variant="bars" />
          </Center>
        )}
        {dataInitialized && children}
      </Box>
    </Paper>
  )
}
