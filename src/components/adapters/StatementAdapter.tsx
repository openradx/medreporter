import { useIsDesigning } from "~/hooks/useIsDesigning"
import { StatementNode } from "~/schemas/report"
import { DraggableCanvasItem } from "../designer/DraggableCanvasItem"
import { NodeStatement } from "../node_fields/NodeStatement"

interface StatementAdapterProps {
  node: StatementNode
}

export const StatementAdapter = ({ node }: StatementAdapterProps) => {
  const isDesigning = useIsDesigning()

  if (isDesigning) {
    return <DraggableCanvasItem node={node} />
  }

  return <NodeStatement node={node} />
}
