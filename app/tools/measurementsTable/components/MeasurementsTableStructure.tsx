import { MeasurementsField } from "app/core/components/fields/MeasurementsField"
import { Grid } from "app/core/components/structuredReport/Grid"
import { GridItem } from "app/core/components/structuredReport/GridItem"

export const MeasurementsTableStructure = () => (
  <Grid>
    <GridItem size="xl">
      <MeasurementsField id="measurements" />
    </GridItem>
  </Grid>
)
