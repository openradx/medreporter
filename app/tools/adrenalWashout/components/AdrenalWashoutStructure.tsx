import { NumberField } from "../../../core/components/fields/NumberField"
import { Description } from "../../../core/components/structuredReport/Description"
import { Grid } from "../../../core/components/structuredReport/Grid"
import { GridItem } from "../../../core/components/structuredReport/GridItem"
import { Hint } from "../../../core/components/structuredReport/Hint"
import { Hints } from "../../../core/components/structuredReport/Hints"
import { MAX_HU, MIN_HU } from "../../../core/constants/general"

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
