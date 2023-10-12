import { MeasurementsOutputEl } from "~/schemas/report"
import { MeasurementsOutput } from "../outputs/MeasurementsOutput"

interface MeasurementsOutputAdapterProps {
  element: MeasurementsOutputEl
}

export const MeasurementsOutputAdapter = ({ element }: MeasurementsOutputAdapterProps) => (
  <MeasurementsOutput
    fieldId={element.fieldId}
    data={[]} // TODO:
    stats="" // TODO:
    legend={element.legend}
    previousLabel={element.previousLabel}
    currentLabel={element.currentLabel}
    locationLabel={element.locationLabel}
    referenceLabel={element.referenceLabel}
  />
)
