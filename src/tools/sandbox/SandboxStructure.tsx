import { DateField } from "~/components/fields/DateField"
import { FreeTextField } from "~/components/fields/FreeTextField"
import { NumberField } from "~/components/fields/NumberField"
import { Group } from "~/components/template/Group"
import { Hint } from "~/components/template/Hint"
import { Section } from "~/components/template/Section"
import { Structure } from "~/components/template/Structure"

export const SandboxStructure = () => (
  <Structure>
    <Section label="default" id="default">
      <Hint>Just a tool to play with the layout and the functions of the fields.</Hint>
      <Group border label="Sandbox">
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
      </Group>
    </Section>
  </Structure>
)
