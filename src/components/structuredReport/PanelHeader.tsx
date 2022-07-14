import { Box, Text } from "@mantine/core"
import { ReactNode } from "react"

interface PanelHeaderProps {
  title: string
  actions?: ReactNode
}

export const PanelHeader = ({ title, actions }: PanelHeaderProps) => (
  <Box
    component="header"
    sx={(theme) => ({
      borderBottom: `1px solid ${
        theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[2]
      }`,
      padding: theme.spacing.xs,
      display: "flex",
    })}
  >
    <Text>{title}</Text>
    {actions}
  </Box>
)