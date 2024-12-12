/* eslint-disable i18next/no-literal-string */
import { DateField } from "~/components/fields/DateField"
import { FreeTextField } from "~/components/fields/FreeTextField"
import { NumberField } from "~/components/fields/NumberField"
import { SingleChoiceField } from "~/components/fields/SingleChoiceField"
import { Group } from "~/components/template/Group"
import { Hint } from "~/components/template/Hint"
import { Section } from "~/components/template/Section"
import { Structure } from "~/components/template/Structure"

export const SandboxStructure = () => (
  <Structure>
    <Section label="default" id="default">
      <Hint content="Just a tool to play with the group and the functions of the fields." />
      <Group border label="Sandbox" direction="column">
        <DateField id="today" label="Today" format="DD/MM/YYYY" width="small" />
        <DateField id="tomorrow" label="Tomorrow" format="YYYY-MM-DD" width="medium" />
        <DateField id="yesterday" label="Yesterday" width="large" />
        <NumberField
          id="number"
          label="Random number"
          defaultValue={0}
          precision={0}
          min={0}
          max={100}
          width="full"
        />
        <FreeTextField id="text" label="Some text" />
        <SingleChoiceField
          id="choice"
          label="Some choice"
          options={[
            { value: "one", label: "One" },
            { value: "two", label: "Two" },
            { value: "three", label: "Flubdidubidium" },
          ]}
        />
      </Group>
    </Section>
  </Structure>
)
