import { MeasurementsFieldNode, measurementsFieldNodeSchema } from "~/schemas/structure"
import { DisabledProperty } from "../properties/DisabledProperty"
import { FieldIdProperty } from "../properties/FieldIdProperty"
import { FollowUpProperty } from "../properties/FollowUpProperty"
import { HiddenProperty } from "../properties/HiddenProperty"
import { InfoProperty } from "../properties/InfoProperty"
import { LabelProperty } from "../properties/LabelProperty"
import { MeasurementDimensionsProperty } from "../properties/MeasurementDimensionsProperty"
import { MeasurementRowsProperty } from "../properties/MeasurementRowsProperty"
import { MeasurementsDefaultProperty } from "../properties/MeasurementsDefaultProperty"
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
    <FollowUpProperty />
    <MeasurementRowsProperty />
    <MeasurementDimensionsProperty />
    <MeasurementsDefaultProperty />
  </PropertiesForm>
)
