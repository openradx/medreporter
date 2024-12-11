import { Grid } from "@mantine/core"
import { FilterProvider } from "../common/FilterProvider"
import { TemplateList } from "./TemplateList"

export const Templates = () => (
  <Grid>
    <Grid.Col span={9}>
      <FilterProvider>
        <TemplateList />
      </FilterProvider>
    </Grid.Col>
    <Grid.Col span={3}></Grid.Col>
  </Grid>
)
