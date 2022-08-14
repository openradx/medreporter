import { Card, Stack, Text } from "@mantine/core"
import { RouteUrlObject } from "blitz"
import Link from "next/link"

interface AdminFeatureCardProps {
  url: RouteUrlObject
  title: string
  description: string
}

export const AdminFeatureCard = ({ url, title, description }: AdminFeatureCardProps) => (
  <Link href={url} passHref>
    <Card component="a" withBorder>
      <Stack spacing={4} sx={{ height: 130 }}>
        <Text weight={500}>{title}</Text>
        <Text size="sm" color="dimmed" sx={{ flexGrow: 1 }}>
          {description}
        </Text>
      </Stack>
    </Card>
  </Link>
)
