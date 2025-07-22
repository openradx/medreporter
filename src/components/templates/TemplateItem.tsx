import { useLingui as useLinguiLazy } from "@lingui/react"
import { useLingui as useLinguiMacro } from "@lingui/react/macro"
import { ActionIcon, Badge, Card, Flex, Group, Stack, Text } from "@mantine/core"
import { Pencil as EditIcon } from "lucide-react"
import Link from "next/link"
import { CATEGORIES } from "~/constants/lazy-translations"
import { useUser } from "~/hooks/useUser"
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
  const user = useUser()?.username

  return (
    <Link
      href={{ pathname: "/templates/[username]/[slug]", query: { username, slug } }}
      passHref
      className={classes.legacyLink}
    >
      <Card withBorder>
        <Stack gap={4} h={130} justify="space-between">
          <Flex justify="space-between" align="center">
            <Flex gap={8} align="center">
              <Text fw={500} size="xl" truncate="end">
                {title}
              </Text>
              {user === username && (
                <Link
                  href={{
                    pathname: "/templates/[username]/[slug]",
                    query: { username, slug, edit: "true" },
                  }}
                  passHref
                  className={classes.legacyLink}
                >
                  <ActionIcon variant="subtle" color="gray" title={t`Edit template`}>
                    <EditIcon size={20} />
                  </ActionIcon>
                </Link>
              )}
            </Flex>
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
                <Text size="xs">{t`Authored by:`}</Text>
                <Text size="xs" fw={500}>
                  {username}
                </Text>
              </Group>
              <Group>
                <Text size="xs">{t`Last modified:`}</Text>
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
