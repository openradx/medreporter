import { useIsDesigning } from "~/hooks/useIsDesigning"
import { NumberFieldNode } from "~/schemas/structure"
import { DraggableCanvasItem } from "../designer/DraggableCanvasItem"
import { NumberNodeField } from "../node_fields/NumberNodeField"

interface NumberFieldAdapterProps {
  node: NumberFieldNode
}

export const NumberFieldAdapter = ({ node }: NumberFieldAdapterProps) => {
  const isDesigning = useIsDesigning()

  if (isDesigning) {
    return <DraggableCanvasItem node={node} />
  }
  return <NumberNodeField node={node} />
}
