import { useIsDesigning } from "~/hooks/useIsDesigning"
import { DateFieldNode } from "~/schemas/structure"
import { DraggableCanvasItem } from "../designer/DraggableCanvasItem"
import { DateNodeField } from "../node_fields/DateNodeField"

interface DateFieldAdapterProps {
  node: DateFieldNode
}

export const DateFieldAdapter = ({ node }: DateFieldAdapterProps) => {
  const isDesigning = useIsDesigning()

  if (isDesigning) {
    return <DraggableCanvasItem node={node} />
  }

  return <DateNodeField node={node} />
}
