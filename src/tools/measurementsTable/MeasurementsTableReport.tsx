import { MeasurementsOutput } from "~/components/outputs/MeasurementsOutput"
import { Report } from "~/components/template/Report"

export const MeasurementsTableReport = () => (
  <Report>
    <MeasurementsOutput link="measurements" linkedMeasurementsField="measurements" />
  </Report>
)
