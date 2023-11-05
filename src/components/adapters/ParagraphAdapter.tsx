import { evalCodeToBoolean } from "~/medtl/interpreter"
import { ParagraphNode } from "~/schemas/report"
import { Paragraph } from "../template/Paragraph"
import { StatementAdapter } from "./StatementAdapter"

interface ParagraphAdapterProps {
  node: ParagraphNode
}

export const ParagraphAdapter = ({ node }: ParagraphAdapterProps) => (
  <Paragraph
    title={node.title}
    fieldId={node.link} // TODO: rename fieldId of Paragraph to link
    hidden={evalCodeToBoolean(node.hidden)}
    list={node.list}
  >
    {node.children.map((child) => (
      <StatementAdapter key={child.nodeId} node={child} />
    ))}
  </Paragraph>
)
