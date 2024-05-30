import { useIsDesigning } from "~/hooks/useIsDesigning"
import { HintNode } from "~/schemas/structure"
import { DraggableCanvasItem } from "../designer/DraggableCanvasItem"
import { NodeHint } from "../node_fields/NodeHint"

interface HintAdapterProps {
  node: HintNode
}

export const HintAdapter = ({ node }: HintAdapterProps) => {
  const isDesigning = useIsDesigning()

  if (isDesigning) {
    return <DraggableCanvasItem node={node} />
  }

  return <NodeHint node={node} />
}
