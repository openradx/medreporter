import { MeasurementsOutputNode, measurementsOutputNodeSchema } from "~/schemas/report"
import { CurrentLabelProperty } from "../properties/CurrentLabelProperty"
import { LabelProperty } from "../properties/LabelProperty"
import { LegendProperty } from "../properties/LegendProperty"
import { LinkProperty } from "../properties/LinkProperty"
import { LocationLabelProperty } from "../properties/LocationLabel"
import { PreviousLabelProperty } from "../properties/PreviousLabelProperty"
import { ReferenceLabelProperty } from "../properties/ReferenceLabelProperty"
import { PropertiesForm } from "./PropertiesForm"

interface MeasurementsOutputPropertiesFormProps {
  node: MeasurementsOutputNode
}

export const MeasurementsOutputPropertiesForm = ({
  node,
}: MeasurementsOutputPropertiesFormProps) => (
  <PropertiesForm
    nodeId={node.nodeId}
    schema={measurementsOutputNodeSchema.omit({ nodeId: true, type: true })}
    initialValues={node}
  >
    <LabelProperty />
    <LinkProperty />
    <LegendProperty />
    <CurrentLabelProperty />
    <PreviousLabelProperty />
    <LocationLabelProperty />
    <ReferenceLabelProperty />
  </PropertiesForm>
)
