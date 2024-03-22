import { Paper, ScrollArea, Stack } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks"
import { ReactNode } from "react"
import { REPORT_CONTENT_ID } from "~/constants"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { selectOutputFormat } from "~/state/displaySlice"
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
  const outputFormat = useAppSelector(selectOutputFormat)
  const matches = useMediaQuery("(min-width: 88em)")

  return (
    <Paper
      style={{
        width: matches ? "40%" : "100%",
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
      {!isDesigning && (
        <ScrollArea h="100%" className={classes.report} scrollHideDelay={0}>
          <Stack
            id={REPORT_CONTENT_ID}
            h="100%"
            mx="sm"
            ff="monospace"
            style={{ whiteSpace: outputFormat === "html" ? "pre-wrap" : "pre", flexGrow: 1 }}
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
