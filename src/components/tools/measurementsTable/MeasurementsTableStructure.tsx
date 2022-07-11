import { MeasurementsField } from "../../fields/MeasurementsField"
import { Grid } from "../../structuredReport/Grid"
import { GridItem } from "../../structuredReport/GridItem"

export const MeasurementsTableStructure = () => (
  <Grid>
    <GridItem size="lg">
      <MeasurementsField id="measurements" />
    </GridItem>
  </Grid>
)
