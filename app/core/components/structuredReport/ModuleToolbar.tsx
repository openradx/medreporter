import { Box, Text } from "@mantine/core"
import { ReactNode } from "react"

interface ModuleToolbarProps {
  title?: string
  actions?: ReactNode
}

export const ModuleToolbar = ({ title, actions }: ModuleToolbarProps) => (
  <Box
    sx={(theme) => ({
      borderBottom: `1px solid ${
        theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[2]
      }`,
      padding: theme.spacing.xs,
      display: "flex",
      justifyContent: "space-between",
    })}
  >
    <Text>{title}</Text>
    {actions}
  </Box>
)