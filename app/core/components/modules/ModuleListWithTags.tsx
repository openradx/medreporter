import { Grid, Stack } from "@mantine/core"
import { FilterInput } from "app/core/components/common/FilterInput"
import { FilterProvider } from "app/core/components/common/FilterProvider"
import { SuspenseLoader } from "app/core/components/common/SuspenseLoader"
import { useSiteTranslation } from "app/core/hooks/useSiteTranslation"
import { ModuleList } from "./ModuleList"
import { ModuleTagList } from "./ModuleTagList"

export const ModuleListWithTags = () => {
  const { t } = useSiteTranslation()

  return (
    <FilterProvider>
      <Grid>
        <Grid.Col span={8}>
          <Stack spacing={1} sx={{ height: "100%", width: "80%" }}>
            <FilterInput label={t("ModuleSelectorWithTags.filterInputLabel")} />
            <SuspenseLoader>
              <ModuleList />
            </SuspenseLoader>
          </Stack>
        </Grid.Col>
        <Grid.Col span={4}>
          <SuspenseLoader>
            <ModuleTagList />
          </SuspenseLoader>
        </Grid.Col>
      </Grid>
    </FilterProvider>
  )
}