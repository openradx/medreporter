import { Box, MediaQuery } from "@mantine/core"
import { ReactNode } from "react"

interface TemplateProps {
  title: string
  info?: string
  children: ReactNode
}

// TODO: use title and info, remove eslint disable
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Template = ({ title, info, children }: TemplateProps) => (
  <MediaQuery smallerThan="sm" styles={{ flexDirection: "column" }}>
    <Box
      sx={(theme) => ({
        width: "100%",
        height: "100%",
        minHeight: 0,
        display: "flex",
        alignItems: "stretch",
        gap: theme.spacing.xs,
      })}
    >
      {children}
    </Box>
  </MediaQuery>
)
