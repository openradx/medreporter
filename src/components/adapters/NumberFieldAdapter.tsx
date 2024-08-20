import { useIsDesigning } from "~/hooks/useIsDesigning"
import { NumberFieldNode } from "~/schemas/structure"
import { DraggableCanvasItem } from "../designer/DraggableCanvasItem"
import { NumberFieldInstance } from "../field_instances/NumberFieldInstance"

interface NumberFieldAdapterProps {
  node: NumberFieldNode
}

export const NumberFieldAdapter = ({ node }: NumberFieldAdapterProps) => {
  const isDesigning = useIsDesigning()

  if (isDesigning) {
    return <DraggableCanvasItem node={node} />
  }
  return <NumberFieldInstance node={node} />
}
