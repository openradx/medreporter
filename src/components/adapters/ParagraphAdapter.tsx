import { useIsDesigning } from "~/hooks/useIsDesigning"
import { ParagraphNode } from "~/schemas/report"
import { DraggableCanvasContainer } from "../designer/DraggableCanvasContainer"
import { NodeParagraph } from "../node_fields/NodeParagraph"
import { StatementAdapter } from "./StatementAdapter"

interface ParagraphAdapterProps {
  node: ParagraphNode
}

export const ParagraphAdapter = ({ node }: ParagraphAdapterProps) => {
  const isDesigning = useIsDesigning()

  const children = node.children.map((child) => (
    <StatementAdapter key={child.nodeId} node={child} />
  ))

  if (isDesigning) {
    return <DraggableCanvasContainer node={node}>{children}</DraggableCanvasContainer>
  }

  return <NodeParagraph node={node}>{children}</NodeParagraph>
}
