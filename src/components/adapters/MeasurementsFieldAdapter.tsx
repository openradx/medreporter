import { useIsDesigning } from "~/hooks/useIsDesigning"
import { MeasurementsFieldNode } from "~/schemas/structure"
import { DraggableCanvasItem } from "../designer/DraggableCanvasItem"
import { MeasurementsFieldInstance } from "../node_fields/MeasurementsFieldInstance"

interface MeasurementsFieldAdapterProps {
  node: MeasurementsFieldNode
}

export const MeasurementsFieldAdapter = ({ node }: MeasurementsFieldAdapterProps) => {
  const isDesigning = useIsDesigning()

  if (isDesigning) {
    return <DraggableCanvasItem node={node} />
  }

  return <MeasurementsFieldInstance node={node} />
}
