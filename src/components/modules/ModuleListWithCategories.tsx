import { Grid, Stack } from "@mantine/core"
import { FilterInput } from "~/components/common/FilterInput"
import { FilterProvider } from "~/components/common/FilterProvider"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
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
            <ModuleList />
          </Stack>
        </Grid.Col>
        <Grid.Col span={4}>
          <ModuleCategoryList />
        </Grid.Col>
      </Grid>
    </FilterProvider>
  )
}
