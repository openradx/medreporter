import { MAX_HU, MIN_HU } from "../../../constants"
import { NumberField } from "../../fields/NumberField"
import { Grid } from "../../structuredReport/Grid"
import { Hint } from "../../structuredReport/Hint"
import { Hints } from "../../structuredReport/Hints"

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
      <Hints>
        <Hint>Whenever possible the absolute washout should be preferred.</Hint>
        <Hint>
          The ROI should cover approximately two-third of the lesion without including the
          periphery.
        </Hint>
      </Hints>
    </Grid.Item>
  </Grid>
)
