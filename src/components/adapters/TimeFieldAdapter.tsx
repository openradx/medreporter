import { useIsDesigning } from "~/hooks/useIsDesigning"
import { TimeFieldNode } from "~/schemas/structure"
import { DraggableCanvasItem } from "../designer/DraggableCanvasItem"
import { TimeFieldInstance } from "../field_instances/TimeFieldInstance"

interface TimeFieldAdapterProps {
  node: TimeFieldNode
}

export const TimeFieldAdapter = ({ node }: TimeFieldAdapterProps) => {
  const isDesigning = useIsDesigning()

  if (isDesigning) {
    return <DraggableCanvasItem node={node} />
  }

  return <TimeFieldInstance node={node} />
}
