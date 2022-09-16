import { Grid, Stack } from "@mantine/core"
import { FilterInput } from "app/core/components/common/FilterInput"
import { FilterProvider } from "app/core/components/common/FilterProvider"
import { SuspenseLoader } from "app/core/components/common/SuspenseLoader"
import { useSiteTranslation } from "app/core/hooks/useSiteTranslation"
import { ModuleCategoryList } from "./ModuleCategoryList"
import { ModuleList } from "./ModuleList"

export const ModuleListWithCategories = () => {
  const { t } = useSiteTranslation()

  return (
    <FilterProvider>
      <Grid>
        <Grid.Col span={8}>
          <Stack>
            <FilterInput label={t("ModuleSelectorWithCategories.filterInputLabel")} />
            <SuspenseLoader>
              <ModuleList />
            </SuspenseLoader>
          </Stack>
        </Grid.Col>
        <Grid.Col span={4}>
          <SuspenseLoader>
            <ModuleCategoryList />
          </SuspenseLoader>
        </Grid.Col>
      </Grid>
    </FilterProvider>
  )
}
