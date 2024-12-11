import { Badge, Card, Group, Stack, Text } from "@mantine/core"
import Link from "next/link"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"

interface ToolCardProps {
  username: string
  slug: string
  language: string
  title: string
  description: string
  categories: string[]
}

export const TemplateItem = ({
  username,
  slug,
  language,
  title,
  description,
  categories,
}: ToolCardProps) => {
  const { t } = useSiteTranslation()

  return (
    <Link href="/templates" passHref legacyBehavior>
      <Card component="a" withBorder>
        <Stack gap={4} h={130}>
          <Text fw={500}>
            {title} - {slug} - {language}
          </Text>
          <Text size="sm" c="dimmed" style={{ flexGrow: 1 }}>
            {description}
          </Text>
          <Group pt="xs" gap={4}>
            {categories.map((category) => (
              <Badge variant="light" style={{ cursor: "pointer" }} key={category}>
                {t(`categories.${category}`)}
              </Badge>
            ))}
            {username}
          </Group>
        </Stack>
      </Card>
    </Link>
  )
}
