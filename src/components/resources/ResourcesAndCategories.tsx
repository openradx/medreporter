import { Grid, Stack } from "@mantine/core"
import { ResourceType } from "@prisma/client"
import { FilterInput } from "~/components/common/FilterInput"
import { FilterProvider } from "~/components/common/FilterProvider"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { ResourceCategoryList } from "./ResourceCategoryList"
import { ResourceList } from "./ResourceList"

interface ResourcesAndCategoriesProps {
  resourceType: ResourceType
}

export const ResourcesAndCategories = ({ resourceType }: ResourcesAndCategoriesProps) => {
  const { t } = useSiteTranslation()

  return (
    <FilterProvider>
      <Grid>
        <Grid.Col span={8}>
          <Stack>
            <FilterInput label={t("ResourcesAndCategories.filterInputLabel")} />
            <ResourceList resourceType={resourceType} />
          </Stack>
        </Grid.Col>
        <Grid.Col span={4}>
          <ResourceCategoryList resourceType={resourceType} />
        </Grid.Col>
      </Grid>
    </FilterProvider>
  )
}
