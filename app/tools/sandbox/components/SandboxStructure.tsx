import { BooleanField } from "app/core/components/fields/BooleanField"
import { DateField } from "app/core/components/fields/DateField"
import { FreeTextField } from "app/core/components/fields/FreeTextField"
import { MultipleChoiceField } from "app/core/components/fields/MultipleChoiceField"
import { NumberField } from "app/core/components/fields/NumberField"
import { SingleChoiceField } from "app/core/components/fields/SingleChoiceField"
import { BrainArteries, options } from "app/core/components/graphics/BrainArteries"
import { Grid } from "app/core/components/structuredReport/Grid"
import { GridItem } from "app/core/components/structuredReport/GridItem"
import { Hint } from "app/core/components/structuredReport/Hint"
import { Hints } from "app/core/components/structuredReport/Hints"

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
