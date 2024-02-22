import { MeasurementsFieldNode, measurementsFieldNodeSchema } from "~/schemas/structure"
import { DisabledProperty } from "../properties/DisabledProperty"
import { FieldIdProperty } from "../properties/FieldIdProperty"
import { HiddenProperty } from "../properties/HiddenProperty"
import { InfoProperty } from "../properties/InfoProperty"
import { LabelProperty } from "../properties/LabelProperty"
import { PropertiesForm } from "./PropertiesForm"

interface MeasurementsFieldPropertiesFormProps {
  node: MeasurementsFieldNode
}

export const MeasurementsFieldPropertiesForm = ({ node }: MeasurementsFieldPropertiesFormProps) => (
  <PropertiesForm
    nodeId={node.nodeId}
    schema={measurementsFieldNodeSchema.omit({ nodeId: true, type: true })}
    initialValues={node}
  >
    <LabelProperty />
    <FieldIdProperty />
    <InfoProperty />
    <DisabledProperty />
    <HiddenProperty />
    {/* <RowsProperty />
    <DimensionsProperty />
    <FollowUpProperty />
    <MeasurementsDefaultProperty node={node} /> */}
  </PropertiesForm>
)
