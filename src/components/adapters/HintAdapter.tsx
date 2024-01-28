import { useIsDesigning } from "~/hooks/useIsDesigning"
import { evalCodeToBoolean } from "~/medtl/interpreter"
import { HintNode } from "~/schemas/structure"
import { DraggableCanvasItem } from "../designer/DraggableCanvasItem"
import { Hint } from "../template/Hint"

interface HintAdapterProps {
  node: HintNode
}

export const HintAdapter = ({ node }: HintAdapterProps) => {
  const isDesigning = useIsDesigning()
  if (isDesigning) {
    return <DraggableCanvasItem node={node} />
  }
  return <Hint level={node.level} content={node.content} hidden={evalCodeToBoolean(node.hidden)} />
}
