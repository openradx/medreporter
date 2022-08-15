import { Card, Group, Stack, Text } from "@mantine/core"
import { RouteUrlObject } from "blitz"
import Link from "next/link"
import { ReactNode } from "react"

interface AdminFeatureCardProps {
  url: RouteUrlObject
  icon: ReactNode
  title: string
  description: string
}

export const AdminFeatureCard = ({ url, icon, title, description }: AdminFeatureCardProps) => (
  <Link href={url} passHref>
    <Card component="a" withBorder>
      <Stack spacing={4} sx={{ height: 100 }}>
        <Group spacing="sm">
          {icon}
          <Text weight={500}>{title}</Text>
        </Group>
        <Text size="sm" color="dimmed" sx={{ flexGrow: 1 }}>
          {description}
        </Text>
      </Stack>
    </Card>
  </Link>
)
