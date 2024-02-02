import { StatementNode, statementNodeSchema } from "~/schemas/report"
import { ContentProperty } from "../properties/ContentProperty"
import { HiddenProperty } from "../properties/HiddenProperty"
import { LinkProperty } from "../properties/LinkProperty"
import { PropertiesForm } from "./PropertiesForm"

interface StatementPropertiesFormProps {
  node: StatementNode
}

export const StatementPropertiesForm = ({ node }: StatementPropertiesFormProps) => (
  <PropertiesForm
    nodeId={node.nodeId}
    schema={statementNodeSchema.omit({ nodeId: true, type: true })}
    initialValues={node}
  >
    <LinkProperty />
    <ContentProperty />
    <HiddenProperty />
  </PropertiesForm>
)
