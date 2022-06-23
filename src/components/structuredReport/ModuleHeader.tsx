import { Box, Group, Text } from "@mantine/core"
import { ReactNode } from "react"
import { ExternalLink, ExternalLinkProps } from "./ExternalLink"

interface ModuleHeaderProps {
  title: string
  links?: ExternalLinkProps[]
  actions?: ReactNode
}

export const ModuleHeader = ({ title, links, actions }: ModuleHeaderProps) => (
  <Box
    sx={(theme) => ({
      padding: theme.spacing.xs,
      display: "flex",
      justifyContent: "space-between",
    })}
  >
    <Text>{title}</Text>
    <Group spacing="sm">
      {links?.map((link) => (
        <ExternalLink key={link.url} url={link.url} title={link.title} />
      ))}
      {actions}
    </Group>
  </Box>
)
