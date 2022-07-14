import { DateField } from "../../../core/components/fields/DateField"
import { FreeTextField } from "../../../core/components/fields/FreeTextField"
import { MultipleChoiceField } from "../../../core/components/fields/MultipleChoiceField"
import { NumberField } from "../../../core/components/fields/NumberField"
import { SingleChoiceField } from "../../../core/components/fields/SingleChoiceField"
import { BrainArteries, options } from "../../../core/components/graphics/BrainArteries"

export const SandboxStructure = () => (
  <>
    <DateField id="date" label="Todays date" />
    <NumberField id="number" label="Random number" min={100} max={1000} />
    <SingleChoiceField
      id="arteries"
      label="Arteries of the brain"
      variant="select"
      options={options}
      extras={<BrainArteries />}
    />
    <MultipleChoiceField
      id="bones_feet"
      label="Bones of the feet"
      variant="select"
      extras={<BrainArteries />}
    />
    <FreeTextField id="text" label="Some text" multiline />
  </>
)
