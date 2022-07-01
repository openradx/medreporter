import { MAX_HU, MIN_HU } from "../../../constants"
import { NumberField } from "../../fields/NumberField"
import { Description } from "../../structuredReport/Description"
import { Grid } from "../../structuredReport/Grid"
import { GridItem } from "../../structuredReport/GridItem"
import { Hint } from "../../structuredReport/Hint"
import { Hints } from "../../structuredReport/Hints"

export const AdrenalWashoutStructure = () => (
  <Grid>
    <GridItem size="lg">
      <Description>
        Characterization of adrenal lesions to detect adenomas by using contrast enhanced computed
        tomography.
      </Description>
    </GridItem>
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
      <Hints>
        <Hint>
          The ROI should cover approximately two-third of the lesion without including the
          periphery.
        </Hint>
        <Hint>Whenever possible the absolute washout should be preferred.</Hint>
      </Hints>
    </GridItem>
  </Grid>
)
