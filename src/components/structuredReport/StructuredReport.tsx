import { Box } from "@mantine/core"
import { ReactNode } from "react"
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
      {children}
    </Box>
  </TransformerRegistryProvider>
)
