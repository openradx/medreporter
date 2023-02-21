import { Chip, Stack, Text, Title } from "@mantine/core"
import { ResourceType } from "@prisma/client"
import { useFilter } from "~/contexts/FilterContext"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { trpc } from "~/utils/trpc"
import { DataLoader } from "../common/DataLoader"
import { QueryError } from "../common/QueryError"

interface ResourceCategoryListProps {
  resourceType: ResourceType
}

export const ResourceCategoryList = ({ resourceType }: ResourceCategoryListProps) => {
  const { filter, setFilter } = useFilter()
  const { t, currentSiteLanguage } = useSiteTranslation()
  const { data, error, status } = trpc.categories.getCategories.useQuery({
    language: currentSiteLanguage,
    type: resourceType,
  })

  if (status === "loading") {
    return <DataLoader />
  }

  if (status === "error") {
    return <QueryError message={error.message} />
  }

  const filterByCategory = (category: string) => {
    setFilter(`${filter} category:${category}`)
  }

  return (
    <Stack>
      <Title order={6}>{t("ResourceCategoryList.title")}</Title>
      <Stack spacing={0.5}>
        {data.categories.length === 0 && <Text>{t("ResourceCategoryList.noCategories")}</Text>}
        {data.categories.map((category) => (
          <Chip key={category.key} radius="sm" onClick={() => filterByCategory(category.label)}>
            {category.label}
          </Chip>
        ))}
      </Stack>
    </Stack>
  )
}
