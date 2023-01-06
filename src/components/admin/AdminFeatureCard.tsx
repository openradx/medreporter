import { Card, Group, Stack, Text } from "@mantine/core"
import Link from "next/link"
import { Route } from "nextjs-routes"
import { ReactNode } from "react"

interface AdminFeatureCardProps {
  route: Route
  icon: ReactNode
  title: string
  description: string
}

export const AdminFeatureCard = ({ route, icon, title, description }: AdminFeatureCardProps) => (
  <Link href={route} passHref legacyBehavior>
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
