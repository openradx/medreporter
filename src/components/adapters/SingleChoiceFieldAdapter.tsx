import { useIsDesigning } from "~/hooks/useIsDesigning"
import { SingleChoiceFieldNode } from "~/schemas/structure"
import { DraggableCanvasItem } from "../designer/DraggableCanvasItem"
import { SingleChoiceNodeField } from "../node_fields/SingleChoiceNodeField"

interface SingleChoiceFieldAdapterProps {
  node: SingleChoiceFieldNode
}

export const SingleChoiceFieldAdapter = ({ node }: SingleChoiceFieldAdapterProps) => {
  const isDesigning = useIsDesigning()
  if (isDesigning) {
    return <DraggableCanvasItem node={node} />
  }

  return <SingleChoiceNodeField node={node} />
}
