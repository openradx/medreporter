import { Box, MediaQuery } from "@mantine/core"
import { ReactNode } from "react"
import { StructuredReportContextProvider } from "~/contexts/StructuredReportContext"
import { ReportData } from "./ReportData"
import { ReportPanel } from "./ReportPanel"
import { StructurePanel } from "./StructurePanel"
import { TransformerRegistryProvider } from "./TransformerRegistryProvider"

interface StructuredReportProps {
  children: ReactNode
}

export const StructuredReport = ({ children }: StructuredReportProps) => (
  <TransformerRegistryProvider>
    <ReportData>
      <MediaQuery smallerThan="sm" styles={{ flexDirection: "column" }}>
        <Box
          className="medreporter-StructuredReport-root"
          sx={(theme) => ({
            width: "100%",
            height: "100%",
            minHeight: 0,
            display: "flex",
            alignItems: "stretch",
            gap: theme.spacing.xs,
          })}
        >
          <StructurePanel>
            <StructuredReportContextProvider value={{ context: "structure" }}>
              {children}
            </StructuredReportContextProvider>
          </StructurePanel>
          <ReportPanel>
            <StructuredReportContextProvider value={{ context: "report" }}>
              {children}
            </StructuredReportContextProvider>
          </ReportPanel>
        </Box>
      </MediaQuery>
    </ReportData>
  </TransformerRegistryProvider>
)
