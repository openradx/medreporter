import { Grid } from "@mantine/core"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"

export const Templates = () => {
  const { t } = useSiteTranslation()

  return (
    <Grid>
      <Grid.Col span={9}></Grid.Col>
      <Grid.Col span={3}></Grid.Col>
    </Grid>
  )
}
