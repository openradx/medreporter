import { ParagraphNode, paragraphNodeSchema } from "~/schemas/report"
import { HiddenProperty } from "../properties/HiddenProperty"
import { LinkProperty } from "../properties/LinkProperty"
import { ListProperty } from "../properties/ListProperty"
import { TitleProperty } from "../properties/TitleProperty"
import { PropertiesForm } from "./PropertiesForm"

interface ParagraphPropertiesFormProps {
  node: ParagraphNode
}

export const ParagraphPropertiesForm = ({ node }: ParagraphPropertiesFormProps) => (
  <PropertiesForm
    nodeId={node.nodeId}
    schema={paragraphNodeSchema.omit({ nodeId: true, type: true })}
    initialValues={node}
  >
    <LinkProperty />
    <TitleProperty />
    <HiddenProperty />
    <ListProperty />
  </PropertiesForm>
)
