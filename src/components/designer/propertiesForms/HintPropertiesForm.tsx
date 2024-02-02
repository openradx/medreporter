import { HintNode, hintNodeSchema } from "~/schemas/structure"
import { ContentProperty } from "../properties/ContentProperty"
import { HiddenProperty } from "../properties/HiddenProperty"
import { LevelProperty } from "../properties/LevelProperty"
import { PropertiesForm } from "./PropertiesForm"

interface HintPropertiesFormProps {
  node: HintNode
}

export const HintPropertiesForm = ({ node }: HintPropertiesFormProps) => (
  <PropertiesForm
    nodeId={node.nodeId}
    schema={hintNodeSchema.omit({ nodeId: true, type: true })}
    initialValues={node}
  >
    <ContentProperty />
    <HiddenProperty />
    <LevelProperty />
  </PropertiesForm>
)
