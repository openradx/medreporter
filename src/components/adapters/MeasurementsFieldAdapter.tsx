import { useIsDesigning } from "~/hooks/useIsDesigning"
import { MeasurementsFieldNode } from "~/schemas/structure"
import { DraggableCanvasItem } from "../designer/DraggableCanvasItem"
import { MeasurementsNodeField } from "../node_fields/MeasurementsNodeField"

interface MeasurementsFieldAdapterProps {
  node: MeasurementsFieldNode
}

export const MeasurementsFieldAdapter = ({ node }: MeasurementsFieldAdapterProps) => {
  const isDesigning = useIsDesigning()

  if (isDesigning) {
    return <DraggableCanvasItem node={node} />
  }

  return <MeasurementsNodeField node={node} />
}
