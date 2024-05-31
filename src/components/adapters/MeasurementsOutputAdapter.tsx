import { useIsDesigning } from "~/hooks/useIsDesigning"
import { MeasurementsOutputNode } from "~/schemas/report"
import { DraggableCanvasItem } from "../designer/DraggableCanvasItem"
import { MeasurementsOutputInstance } from "../field_instances/MeasurementsOutputInstance"

interface MeasurementsOutputAdapterProps {
  node: MeasurementsOutputNode
}

export const MeasurementsOutputAdapter = ({ node }: MeasurementsOutputAdapterProps) => {
  const isDesigning = useIsDesigning()

  if (isDesigning) {
    return <DraggableCanvasItem node={node} />
  }

  return <MeasurementsOutputInstance node={node} />
}
