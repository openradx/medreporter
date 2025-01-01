import { Grid, Stack } from "@mantine/core"
import { FilterProvider } from "../common/FilterProvider"
import { TemplateFilters } from "./TemplateFilters"
import { TemplateList } from "./TemplateList"
import { TemplateSearch } from "./TemplateSearch"

export const Templates = () => (
  <FilterProvider>
    <Grid w="100%" h="100%" miw={0} align="stretch" styles={{ inner: { height: "100%" } }}>
      <Grid.Col span={9} h="100%">
        <Stack h="100%">
          <TemplateSearch />
          <TemplateList />
        </Stack>
      </Grid.Col>
      <Grid.Col span={3}>
        <TemplateFilters />
      </Grid.Col>
    </Grid>
  </FilterProvider>
)
