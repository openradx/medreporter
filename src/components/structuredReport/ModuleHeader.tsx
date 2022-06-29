import { Box, Text } from "@mantine/core"
import { ReactElement } from "react"

interface ModuleHeaderProps {
  title: string
  actions?: ReactElement
}

export const ModuleHeader = ({ title, actions }: ModuleHeaderProps) => (
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
