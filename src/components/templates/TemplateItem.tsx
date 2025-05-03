import { useLingui as useLinguiLazy } from "@lingui/react"
import { useLingui as useLinguiMacro } from "@lingui/react/macro"
import { Badge, Card, Flex, Group, Stack, Text } from "@mantine/core"
import Link from "next/link"
import { CATEGORIES } from "~/constants/lazy-translations"
import { ItemFlagIcon } from "./ItemFlagIcon"
import classes from "./TemplateItem.module.css"

interface ToolCardProps {
  username: string
  slug: string
  language: string
  title: string
  description: string
  categories: string[]
  updatedAt: Date
}

export const TemplateItem = ({
  username,
  slug,
  language,
  title,
  description,
  categories,
  updatedAt,
}: ToolCardProps) => {
  const { t } = useLinguiMacro()
  const { _ } = useLinguiLazy()

  return (
    <Link
      href={{ pathname: "/templates/[username]/[slug]", query: { username, slug } }}
      passHref
      className={classes.legacyLink}
    >
      <Card withBorder>
        <Stack gap={4} h={130} justify="space-between">
          <Flex justify="space-between">
            <Text fw={500} size="xl" truncate="end">
              {title}
            </Text>
            <ItemFlagIcon language={language} />
          </Flex>
          <Text size="sm" c="dimmed" lineClamp={2}>
            {description}
          </Text>
          <Flex pt="xs" justify="space-between" align="flex-end">
            <Group gap="xs">
              {categories.map((category) => (
                <Badge variant="light" style={{ cursor: "pointer" }} key={category}>
                  {/* @ts-expect-error group is a string by next.js */}
                  {_(CATEGORIES[category])}
                </Badge>
              ))}
            </Group>
            <Stack gap={2} align="flex-end">
              <Group>
                <Text size="xs">{t`Authored by:`}:</Text>
                <Text size="xs" fw={500}>
                  {username}
                </Text>
              </Group>
              <Group>
                <Text size="xs">{t`Last modified:`}:</Text>
                <Text size="xs" fw={500}>
                  {updatedAt.toLocaleDateString()}
                </Text>
              </Group>
            </Stack>
          </Flex>
        </Stack>
      </Card>
    </Link>
  )
}
