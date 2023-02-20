import { Grid, Stack } from "@mantine/core"
import { ResourceType } from "@prisma/client"
import { FilterInput } from "~/components/common/FilterInput"
import { FilterProvider } from "~/components/common/FilterProvider"
import { ResourceCategoryList } from "./ResourceCategoryList"
import { ResourceList } from "./ResourceList"

interface ResourcesAndCategoriesProps {
  resourceType: ResourceType
  filterInputLabel: string
}

export const ResourcesAndCategories = ({
  resourceType,
  filterInputLabel,
}: ResourcesAndCategoriesProps) => (
  <FilterProvider>
    <Grid>
      <Grid.Col span={8}>
        <Stack>
          <FilterInput label={filterInputLabel} />
          <ResourceList resourceType={resourceType} />
        </Stack>
      </Grid.Col>
      <Grid.Col span={4}>
        <ResourceCategoryList resourceType={resourceType} />
      </Grid.Col>
    </Grid>
  </FilterProvider>
)
