import { Badge, Card, Group, Stack, Text } from "@mantine/core"
import Link from "next/link"
import { Route } from "nextjs-routes"

interface ToolCardProps {
  route: Route
  title: string
  description: string
  tags: string[]
}

export const ToolCard = ({ route, title, description, tags }: ToolCardProps) => (
  <Link href={route} passHref legacyBehavior>
    <Card component="a" withBorder>
      <Stack gap={4} h={130}>
        <Text fw={500}>{title}</Text>
        <Text size="sm" c="dimmed" style={{ flexGrow: 1 }}>
          {description}
        </Text>
        <Group pt="xs" gap={4}>
          {tags.map((tag) => (
            <Badge style={{ cursor: "pointer" }} key={tag}>
              {tag}
            </Badge>
          ))}
        </Group>
      </Stack>
    </Card>
  </Link>
)
