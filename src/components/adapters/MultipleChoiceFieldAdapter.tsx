import { useIsDesigning } from "~/hooks/useIsDesigning"
import { MultipleChoiceFieldNode } from "~/schemas/structure"
import { DraggableCanvasItem } from "../designer/DraggableCanvasItem"
import { MultipleChoiceNodeField } from "../node_fields/MultipleChoiceNodeField"

interface MultipleChoiceFieldAdapterProps {
  node: MultipleChoiceFieldNode
}

export const MultipleChoiceFieldAdapter = ({ node }: MultipleChoiceFieldAdapterProps) => {
  const isDesigning = useIsDesigning()

  if (isDesigning) {
    return <DraggableCanvasItem node={node} />
  }

  return <MultipleChoiceNodeField node={node} />
}
