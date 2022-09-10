import { Chip, Stack, Title } from "@mantine/core"
import { useFilter } from "app/core/contexts/FilterContext"
import { useSiteTranslation } from "app/core/hooks/useSiteTranslation"

interface TagListProps {
  tags: string[]
}

export const TagList = ({ tags }: TagListProps) => {
  const { t } = useSiteTranslation()
  const { filter, setFilter } = useFilter()

  const filterByTag = (tag: string) => {
    setFilter(`${filter} tag:${tag}`)
  }

  return (
    <Stack>
      <Title order={6}>{t("TagList.title")}</Title>
      <Stack spacing={0.5}>
        {tags.map((tag) => (
          <Chip key={tag} radius="sm" onClick={() => filterByTag(tag)}>
            {tag}
          </Chip>
        ))}
      </Stack>
    </Stack>
  )
}
