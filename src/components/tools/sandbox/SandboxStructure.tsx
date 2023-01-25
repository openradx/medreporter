import { BinaryField } from "~/components/fields/BinaryField"
import { DateField } from "~/components/fields/DateField"
import { FreeTextField } from "~/components/fields/FreeTextField"
import { MultipleChoiceField } from "~/components/fields/MultipleChoiceField"
import { NumberField } from "~/components/fields/NumberField"
import { SingleChoiceField } from "~/components/fields/SingleChoiceField"
import { BrainArteries, options } from "~/components/graphics/BrainArteries"
import { Grid } from "~/components/sr/Grid"
import { GridItem } from "~/components/sr/GridItem"
import { Hint } from "~/components/sr/Hint"
import { Hints } from "~/components/sr/Hints"

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
      <BinaryField id="pneumothorax" label="Pneumothorax" />
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
