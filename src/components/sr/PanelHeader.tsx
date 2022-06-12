import { Box, Group, Text } from "@mantine/core"
import { ReactNode } from "react"

interface PanelHeaderProps {
  title: string
  children?: ReactNode
}

export const PanelHeader = ({ title, children }: PanelHeaderProps) => (
  <Box
    component="header"
    sx={(theme) => ({
      height: 50,
      borderBottom: `1px solid ${
        theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[2]
      }`,
      padding: theme.spacing.sm,
      display: "flex",
      alignItems: "center",
    })}
  >
    <Text>{title}</Text>
    <Group spacing="sm" sx={{ flexGrow: 1, justifyContent: "center" }}>
      {children}
    </Group>
  </Box>
)
