import { MAX_HU, MIN_HU } from "../../../constants"
import { NumberField } from "../../fields/NumberField"
import { Grid } from "../../structuredReport/Grid"
import { Hint } from "../../structuredReport/Hint"

export const AdrenalWashoutStructure = () => (
  <Grid>
    <Grid.Item>
      <NumberField id="nonEnhanced" label="Non-enhanced phase HU" min={MIN_HU} max={MAX_HU} />
    </Grid.Item>
    <Grid.Item>
      <NumberField id="portalVenous" label="Portal venous phase HU" min={MIN_HU} max={MAX_HU} />
    </Grid.Item>
    <Grid.Item>
      <NumberField id="delayed" label="Delayed phase HU" min={MIN_HU} max={MAX_HU} />
    </Grid.Item>
    <Grid.Item size="lg">
      <Hint>Whenever possible the absolute washout should be preferred.</Hint>
    </Grid.Item>
    <Grid.Item size="lg">
      <Hint>
        The ROI should cover approximately two-third of the lesion without including the periphery.
      </Hint>
    </Grid.Item>
  </Grid>
)
