import { GroupNode, groupNodeSchema } from "~/schemas/structure"
import { BorderProperty } from "../properties/BorderProperty"
import { DirectionProperty } from "../properties/DirectionProperty"
import { DisabledProperty } from "../properties/DisabledProperty"
import { HiddenProperty } from "../properties/HiddenProperty"
import { InfoProperty } from "../properties/InfoProperty"
import { LabelProperty } from "../properties/LabelProperty"
import { PropertiesForm } from "./PropertiesForm"

interface GroupPropertiesFormProps {
  node: GroupNode
}

export const GroupPropertiesForm = ({ node }: GroupPropertiesFormProps) => (
  <PropertiesForm
    nodeId={node.nodeId}
    schema={groupNodeSchema.omit({ nodeId: true, type: true, children: true })}
    initialValues={node}
  >
    <LabelProperty />
    <InfoProperty />
    <DisabledProperty />
    <HiddenProperty />
    <DirectionProperty />
    <BorderProperty />
  </PropertiesForm>
)
