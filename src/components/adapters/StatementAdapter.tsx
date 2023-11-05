import { StatementNode } from "~/schemas/report"
import { Statement } from "../template/Statement"

interface StatementAdapterProps {
  node: StatementNode
}

export const StatementAdapter = ({ node }: StatementAdapterProps) => (
  <Statement fieldId={node.link}>{node.content}</Statement> // TODO: Rename fieldId of Statement to link
)
