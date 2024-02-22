import { FindingFieldNode, findingFieldNodeSchema } from "~/schemas/structure"
import { DirectionProperty } from "../properties/DirectionProperty"
import { DisabledProperty } from "../properties/DisabledProperty"
import { FieldIdProperty } from "../properties/FieldIdProperty"
import { FindingDefaultProperty } from "../properties/FindingDefaultProperty"
import { HiddenProperty } from "../properties/HiddenProperty"
import { InfoProperty } from "../properties/InfoProperty"
import { LabelProperty } from "../properties/LabelProperty"
import { PropertiesForm } from "./PropertiesForm"

interface FindingFieldPropertiesFormProps {
  node: FindingFieldNode
}

export const FindingFieldPropertiesForm = ({ node }: FindingFieldPropertiesFormProps) => (
  <PropertiesForm
    nodeId={node.nodeId}
    schema={findingFieldNodeSchema.omit({ nodeId: true, type: true })}
    initialValues={node}
  >
    <LabelProperty />
    <FieldIdProperty />
    <InfoProperty />
    <DisabledProperty />
    <HiddenProperty />
    <DirectionProperty />
    <FindingDefaultProperty />
  </PropertiesForm>
)
