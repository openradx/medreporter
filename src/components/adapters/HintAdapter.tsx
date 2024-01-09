import { useIsDesigning } from "~/hooks/useIsDesigning"
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
  return <Hint level={node.level}>{node.content}</Hint>
}
