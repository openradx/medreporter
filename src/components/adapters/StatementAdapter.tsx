import { useIsDesigning } from "~/hooks/useIsDesigning"
import { StatementNode } from "~/schemas/report"
import { DraggableCanvasItem } from "../designer/DraggableCanvasItem"
import { StatementInstance } from "../node_fields/StatementInstance"

interface StatementAdapterProps {
  node: StatementNode
}

export const StatementAdapter = ({ node }: StatementAdapterProps) => {
  const isDesigning = useIsDesigning()

  if (isDesigning) {
    return <DraggableCanvasItem node={node} />
  }

  return <StatementInstance node={node} />
}
