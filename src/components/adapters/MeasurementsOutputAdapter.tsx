import { useIsDesigning } from "~/hooks/useIsDesigning"
import { MeasurementsOutputNode } from "~/schemas/report"
import { DraggableCanvasItem } from "../designer/DraggableCanvasItem"
import { NodeMeasurementsOutput } from "../node_fields/NodeMeasurementsOutput"

interface MeasurementsOutputAdapterProps {
  node: MeasurementsOutputNode
}

export const MeasurementsOutputAdapter = ({ node }: MeasurementsOutputAdapterProps) => {
  const isDesigning = useIsDesigning()

  if (isDesigning) {
    return <DraggableCanvasItem node={node} />
  }

  return <NodeMeasurementsOutput node={node} />
}
