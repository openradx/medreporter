import { DateField } from "~/components/fields/DateField"
import { FreeTextField } from "~/components/fields/FreeTextField"
import { NumberField } from "~/components/fields/NumberField"
import { Section } from "~/components/template/Section"
import { Structure } from "~/components/template/Structure"

export const SandboxStructure = () => (
  <Structure>
    <Section label="default" id="default">
      Sandbox
      <DateField id="today" label="Today" />
      <NumberField
        id="number"
        label="Random number"
        defaultValue={0}
        precision={0}
        min={0}
        max={100}
      />
      <FreeTextField id="text" label="Some text" />
    </Section>
  </Structure>
)
