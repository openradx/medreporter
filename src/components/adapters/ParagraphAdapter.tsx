import { useIsDesigning } from "~/hooks/useIsDesigning"
import { ParagraphNode } from "~/schemas/report"
import { DraggableCanvasContainer } from "../designer/DraggableCanvasContainer"
import { ParagraphInstance } from "../field_instances/ParagraphInstance"
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

  return <ParagraphInstance node={node}>{children}</ParagraphInstance>
}
