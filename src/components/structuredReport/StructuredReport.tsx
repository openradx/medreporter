import { Box } from "@mantine/core"
import { ReactNode } from "react"
import { StructuredReportContextProvider } from "../../contexts/StructuredReportContext"
import { ReportPanel } from "./ReportPanel"
import { StructurePanel } from "./StructurePanel"
import { TransformerRegistryProvider } from "./TransformerRegistryProvider"

// import { TransformerRegistryProvider } from "./TransformerRegistryProvider"

interface StructuredReportProps {
  children: ReactNode
}

export const StructuredReport = ({ children }: StructuredReportProps) => (
  <TransformerRegistryProvider>
    <Box
      sx={(theme) => ({
        height: "100%",
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
  </TransformerRegistryProvider>
)
