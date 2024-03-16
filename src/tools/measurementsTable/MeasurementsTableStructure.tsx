import { MeasurementsField } from "~/components/fields/MeasurementsField"
import { Structure } from "~/components/template/Structure"

export const MeasurementsTableStructure = () => (
  <Structure>
    <MeasurementsField id="measurements" border={false} />
  </Structure>
)
