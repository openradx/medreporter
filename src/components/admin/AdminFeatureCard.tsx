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
      <Stack gap={4} h={100}>
        <Group gap="sm">
          {icon}
          <Text fw={500}>{title}</Text>
        </Group>
        <Text size="sm" c="dimmed" style={{ flexGrow: 1 }}>
          {description}
        </Text>
      </Stack>
    </Card>
  </Link>
)
