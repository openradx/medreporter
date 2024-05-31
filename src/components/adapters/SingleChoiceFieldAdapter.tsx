import { useIsDesigning } from "~/hooks/useIsDesigning"
import { SingleChoiceFieldNode } from "~/schemas/structure"
import { DraggableCanvasItem } from "../designer/DraggableCanvasItem"
import { SingleChoiceFieldInstance } from "../node_fields/SingleChoiceInstance"

interface SingleChoiceFieldAdapterProps {
  node: SingleChoiceFieldNode
}

export const SingleChoiceFieldAdapter = ({ node }: SingleChoiceFieldAdapterProps) => {
  const isDesigning = useIsDesigning()
  if (isDesigning) {
    return <DraggableCanvasItem node={node} />
  }

  return <SingleChoiceFieldInstance node={node} />
}
