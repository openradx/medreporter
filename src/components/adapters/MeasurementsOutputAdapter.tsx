import { useIsDesigning } from "~/hooks/useIsDesigning"
import { MeasurementsOutputNode } from "~/schemas/report"
import { DraggableCanvasItem } from "../designer/DraggableCanvasItem"
import { MeasurementsOutput } from "../outputs/MeasurementsOutput"

interface MeasurementsOutputAdapterProps {
  node: MeasurementsOutputNode
}

export const MeasurementsOutputAdapter = ({ node }: MeasurementsOutputAdapterProps) => {
  const isDesigning = useIsDesigning()

  if (isDesigning) {
    return <DraggableCanvasItem node={node} />
  }

  return (
    <MeasurementsOutput
      link={node.link}
      linkedMeasurementsField={node.linkedMeasurementsField}
      stats="" // TODO:
      legend={node.legend}
      previousLabel={node.previousLabel}
      currentLabel={node.currentLabel}
      locationLabel={node.locationLabel}
      referenceLabel={node.referenceLabel}
    />
  )
}
