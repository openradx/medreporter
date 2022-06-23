import { Box, Group, Text } from "@mantine/core"
import { ReactNode } from "react"
import { InfoButton } from "./InfoButton"

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
    <Group spacing="sm">
      {actions}
      <InfoButton />
    </Group>
  </Box>
)
