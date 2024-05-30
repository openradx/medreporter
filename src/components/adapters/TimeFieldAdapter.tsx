import { useIsDesigning } from "~/hooks/useIsDesigning"
import { TimeFieldNode } from "~/schemas/structure"
import { DraggableCanvasItem } from "../designer/DraggableCanvasItem"
import { TimeNodeField } from "../node_fields/TimeNodeField"

interface TimeFieldAdapterProps {
  node: TimeFieldNode
}

export const TimeFieldAdapter = ({ node }: TimeFieldAdapterProps) => {
  const isDesigning = useIsDesigning()

  if (isDesigning) {
    return <DraggableCanvasItem node={node} />
  }

  return <TimeNodeField node={node} />
}
