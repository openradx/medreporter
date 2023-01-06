import { MeasurementsField } from "~/components/fields/MeasurementsField"
import { Grid } from "~/components/sr/Grid"
import { GridItem } from "~/components/sr/GridItem"

export const MeasurementsTableStructure = () => (
  <Grid>
    <GridItem size="xl">
      <MeasurementsField id="measurements" />
    </GridItem>
  </Grid>
)
