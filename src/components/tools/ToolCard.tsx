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
      <Stack spacing={4} sx={{ height: 130 }}>
        <Text weight={500}>{title}</Text>
        <Text size="sm" color="dimmed" sx={{ flexGrow: 1 }}>
          {description}
        </Text>
        <Group pt="xs" spacing={4}>
          {tags.map((tag) => (
            <Badge sx={{ cursor: "pointer" }} key={tag}>
              {tag}
            </Badge>
          ))}
        </Group>
      </Stack>
    </Card>
  </Link>
)
