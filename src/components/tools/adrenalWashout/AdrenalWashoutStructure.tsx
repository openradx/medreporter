import { Grid } from "@mantine/core"
import { MAX_HU, MIN_HU } from "../../../constants"
import { NumberField } from "../../fields/NumberField"
import { GridItem } from "../../structuredReport/GridItem"
import { Hint } from "../../structuredReport/Hint"

export const AdrenalWashoutStructure = () => (
  <Grid>
    <GridItem>
      <NumberField id="nonEnhanced" label="Non-enhanced phase HU" min={MIN_HU} max={MAX_HU} />
    </GridItem>
    <GridItem>
      <NumberField id="portalVenous" label="Portal venous phase HU" min={MIN_HU} max={MAX_HU} />
    </GridItem>
    <GridItem>
      <NumberField id="delayed" label="Delayed phase HU" min={MIN_HU} max={MAX_HU} />
    </GridItem>
    <GridItem size="lg">
      <Hint>Whenever possible the absolute washout should be preferred.</Hint>
    </GridItem>
    <GridItem size="lg">
      <Hint>
        The ROI should cover approximately two-third of the lesion without including the periphery.
      </Hint>
    </GridItem>
  </Grid>
)
