import { useIsDesigning } from "~/hooks/useIsDesigning"
import { evalCodeToBoolean } from "~/medtl/interpreter"
import { StatementNode } from "~/schemas/report"
import { DraggableCanvasItem } from "../designer/DraggableCanvasItem"
import { Statement } from "../template/Statement"

interface StatementAdapterProps {
  node: StatementNode
}

export const StatementAdapter = ({ node }: StatementAdapterProps) => {
  const isDesigning = useIsDesigning()

  if (isDesigning) {
    return <DraggableCanvasItem node={node} />
  }
  return (
    <Statement link={node.link} hidden={evalCodeToBoolean(node.hidden)} content={node.content} />
  )
}
