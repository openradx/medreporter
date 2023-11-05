import { MeasurementsOutputNode } from "~/schemas/report"
import { MeasurementsOutput } from "../outputs/MeasurementsOutput"

interface MeasurementsOutputAdapterProps {
  node: MeasurementsOutputNode
}

export const MeasurementsOutputAdapter = ({ node }: MeasurementsOutputAdapterProps) => (
  <MeasurementsOutput
    fieldId={node.link} // TODO: rename fieldId of MeasurementsOutput to link
    data={[]} // TODO:
    stats="" // TODO:
    legend={node.legend}
    previousLabel={node.previousLabel}
    currentLabel={node.currentLabel}
    locationLabel={node.locationLabel}
    referenceLabel={node.referenceLabel}
  />
)
