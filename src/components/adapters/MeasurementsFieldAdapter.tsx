import { evalCodeToBoolean } from "~/medtl/interpreter"
import { MeasurementsFieldNode } from "~/schemas/structure"
import { MeasurementsField } from "../fields/MeasurementsField"
import { Info } from "../template/Info"

interface MeasurementsFieldAdapterProps {
  node: MeasurementsFieldNode
}

export const MeasurementsFieldAdapter = ({ node }: MeasurementsFieldAdapterProps) => (
  <MeasurementsField
    id={node.fieldId}
    label={node.label}
    extras={node.info && <Info>{node.info}</Info>}
    disabled={evalCodeToBoolean(node.disabled)}
    hidden={evalCodeToBoolean(node.hidden)}
    defaultValue={undefined}
  />
)
