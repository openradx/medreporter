import { Box, Group, Text } from "@mantine/core"
import { ReactNode } from "react"

interface ModuleHeaderProps {
  title: string
  actions?: ReactNode
}

export const ModuleHeader = ({ title, actions }: ModuleHeaderProps) => (
  <Box
    sx={(theme) => ({
      padding: theme.spacing.xs,
      display: "flex",
      justifyContent: "space-between",
    })}
  >
    <Text>{title}</Text>
    <Group spacing="xs">{actions}</Group>
  </Box>
)
