import { MeasurementsField } from "~/components/fields/MeasurementsField"
import { Section } from "~/components/template/Section"
import { Structure } from "~/components/template/Structure"

export const MeasurementsTableStructure = () => (
  <Structure>
    <Section id="default" label="default">
      <MeasurementsField id="measurements" border={false} />
    </Section>
  </Structure>
)
