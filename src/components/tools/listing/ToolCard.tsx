import { Badge, Card, Group, Text } from "@mantine/core"
import Link from "next/link"

interface ToolCardProps {
  title: string
  description: string
  url: string
  tags: string[]
}

export const ToolCard = ({ title, description, url, tags }: ToolCardProps) => (
  <Link href={url} passHref>
    <Card component="a" withBorder>
      <Text weight={500}>{title}</Text>
      <Text pt="xs" size="sm" color="dimmed">
        {description}
      </Text>
      <Group pt="xs" spacing={4}>
        {tags.map((tag) => (
          <Badge sx={{ cursor: "pointer" }} key={tag}>
            {tag}
          </Badge>
        ))}
      </Group>
    </Card>
  </Link>
)
