import { MeasurementsField } from "../../../core/components/fields/MeasurementsField"
import { Grid } from "../../../core/components/structuredReport/Grid"
import { GridItem } from "../../../core/components/structuredReport/GridItem"

export const MeasurementsTableStructure = () => (
  <Grid>
    <GridItem size="lg">
      <MeasurementsField id="measurements" />
    </GridItem>
  </Grid>
)
