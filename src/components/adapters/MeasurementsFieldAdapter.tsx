import { useIsDesigning } from "~/hooks/useIsDesigning"
import { MeasurementsFieldNode } from "~/schemas/structure"
import { DraggableCanvasItem } from "../designer/DraggableCanvasItem"
import { MeasurementsFieldInstance } from "../field_instances/MeasurementsFieldInstance"

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
