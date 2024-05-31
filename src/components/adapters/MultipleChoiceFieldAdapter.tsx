import { useIsDesigning } from "~/hooks/useIsDesigning"
import { MultipleChoiceFieldNode } from "~/schemas/structure"
import { DraggableCanvasItem } from "../designer/DraggableCanvasItem"
import { MultipleChoiceFieldInstance } from "../field_instances/MultipleChoiceFieldInstance"

interface MultipleChoiceFieldAdapterProps {
  node: MultipleChoiceFieldNode
}

export const MultipleChoiceFieldAdapter = ({ node }: MultipleChoiceFieldAdapterProps) => {
  const isDesigning = useIsDesigning()

  if (isDesigning) {
    return <DraggableCanvasItem node={node} />
  }

  return <MultipleChoiceFieldInstance node={node} />
}
