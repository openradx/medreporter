import { Hint } from "app/core/components/structuredReport/Hint"
import { Hints } from "app/core/components/structuredReport/Hints"
import { BooleanField } from "../../../core/components/fields/BooleanField"
import { DateField } from "../../../core/components/fields/DateField"
import { FreeTextField } from "../../../core/components/fields/FreeTextField"
import { MultipleChoiceField } from "../../../core/components/fields/MultipleChoiceField"
import { NumberField } from "../../../core/components/fields/NumberField"
import { SingleChoiceField } from "../../../core/components/fields/SingleChoiceField"
import { BrainArteries, options } from "../../../core/components/graphics/BrainArteries"
import { Grid } from "../../../core/components/structuredReport/Grid"
import { GridItem } from "../../../core/components/structuredReport/GridItem"

export const SandboxStructure = () => (
  <Grid>
    <GridItem size="md">
      <DateField id="date" label="Todays date" />
    </GridItem>
    <GridItem size="md">
      <NumberField id="number" label="Random number" min={100} max={1000} />
    </GridItem>
    <GridItem size="md">
      <SingleChoiceField
        id="arteries"
        label="Arteries of the brain"
        variant="select"
        options={options}
        extras={<BrainArteries />}
      />
    </GridItem>
    <GridItem size="md">
      <MultipleChoiceField
        id="bones_feet"
        label="Bones of the feet"
        variant="select"
        extras={<BrainArteries />}
      />
    </GridItem>
    <GridItem size="md">
      <FreeTextField id="text" label="Some text" multiline />
    </GridItem>
    <GridItem size="md">
      <BooleanField id="pneumothorax" label="Pneumothorax" />
    </GridItem>
    <GridItem size="lg">
      <Hints>
        <Hint type="info">
          Some info. Some info. Some info. Some info. Some info. Some info. Some info. Some info.
          Some info.
        </Hint>
        <Hint type="warning">
          Warning! Warning! Warning! Warning! Warning! Warning! Warning! Warning! Warning! Warning!
        </Hint>
      </Hints>
    </GridItem>
  </Grid>
)
