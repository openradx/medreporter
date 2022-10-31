import { Chip, Stack, Title } from "@mantine/core"
import { useFilter } from "app/core/contexts/FilterContext"
import { useSiteTranslation } from "app/core/hooks/useSiteTranslation"

interface CategoryListProps {
  categories: { key: string; label: string }[]
}

export const CategoryList = ({ categories }: CategoryListProps) => {
  const { t } = useSiteTranslation()
  const { filter, setFilter } = useFilter()

  const filterByCategory = (category: string) => {
    setFilter(`${filter} category:${category}`)
  }

  return (
    <Stack>
      <Title order={6}>{t("CategoryList.title")}</Title>
      <Stack spacing={0.5}>
        {categories.map((category) => (
          <Chip key={category.key} radius="sm" onClick={() => filterByCategory(category.label)}>
            {category.label}
          </Chip>
        ))}
      </Stack>
    </Stack>
  )
}
