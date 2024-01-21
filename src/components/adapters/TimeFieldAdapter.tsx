import { useIsDesigning } from "~/hooks/useIsDesigning"
import { evalCodeToBoolean } from "~/medtl/interpreter"
import { TimeFieldNode } from "~/schemas/structure"
import { DraggableCanvasItem } from "../designer/DraggableCanvasItem"
import { TimeField } from "../fields/TimeField"
import { Info } from "../template/Info"

interface TimeFieldAdapterProps {
  node: TimeFieldNode
}

export const TimeFieldAdapter = ({ node }: TimeFieldAdapterProps) => {
  const isDesigning = useIsDesigning()

  if (isDesigning) {
    return <DraggableCanvasItem node={node} />
  }

  return (
    <TimeField
      id={node.fieldId}
      label={node.label}
      extras={node.info && <Info>{node.info}</Info>}
      disabled={evalCodeToBoolean(node.disabled)}
      hidden={evalCodeToBoolean(node.hidden)}
      withSeconds={node.withSeconds}
      defaultValue={node.default}
    />
  )
}
