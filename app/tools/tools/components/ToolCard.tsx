import { Badge, Card, Group, Stack, Text } from "@mantine/core"
import Link from "next/link"

interface ToolCardProps {
  title: string
  description: string
  url: string
  tags: string[]
}

export const ToolCard = ({ title, description, url, tags }: ToolCardProps) => (
  <Link href={url} legacyBehavior passHref>
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
