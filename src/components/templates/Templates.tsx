import { Grid } from "@mantine/core"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { FilterProvider } from "../common/FilterProvider"
import { TemplateList } from "./TemplateList"

export const Templates = () => {
  const { t } = useSiteTranslation()

  return (
    <Grid>
      <Grid.Col span={9}>
        <FilterProvider>
          <TemplateList />
        </FilterProvider>
      </Grid.Col>
      <Grid.Col span={3}></Grid.Col>
    </Grid>
  )
}
