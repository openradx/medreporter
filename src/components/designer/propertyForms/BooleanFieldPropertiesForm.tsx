import { BooleanFieldNode, booleanFieldNodeSchema } from "~/schemas/structure"
import { BooleanDefaultProperty } from "../properties/BooleanDefaultProperty"
import { DisabledProperty } from "../properties/DisabledProperty"
import { FieldIdProperty } from "../properties/FieldIdProperty"
import { HiddenProperty } from "../properties/HiddenProperty"
import { InfoProperty } from "../properties/InfoProperty"
import { LabelProperty } from "../properties/LabelProperty"
import { PropertiesForm } from "./PropertiesForm"

interface BooleanFieldPropertiesFormProps {
  node: BooleanFieldNode
}

export const BooleanFieldPropertiesForm = ({ node }: BooleanFieldPropertiesFormProps) => (
  <PropertiesForm
    nodeId={node.nodeId}
    schema={booleanFieldNodeSchema.omit({ nodeId: true, type: true })}
    initialValues={node}
  >
    <LabelProperty />
    <FieldIdProperty />
    <InfoProperty />
    <DisabledProperty />
    <HiddenProperty />
    <BooleanDefaultProperty />
  </PropertiesForm>
)
