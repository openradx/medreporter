import { useIsDesigning } from "~/hooks/useIsDesigning"
import { FreeTextFieldNode } from "~/schemas/structure"
import { DraggableCanvasItem } from "../designer/DraggableCanvasItem"
import { FreeTextFieldInstance } from "../field_instances/FreeTextFieldInstance"

interface FreeTextFieldAdapterProps {
  node: FreeTextFieldNode
}

export const FreeTextFieldAdapter = ({ node }: FreeTextFieldAdapterProps) => {
  const isDesigning = useIsDesigning()

  if (isDesigning) {
    return <DraggableCanvasItem node={node} />
  }

  return <FreeTextFieldInstance node={node} />
}
