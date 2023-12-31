import { useIsDesigning } from "~/hooks/useIsDesigning"
import { evalCodeToBoolean } from "~/medtl/interpreter"
import { NumberFieldNode } from "~/schemas/structure"
import { DraggableCanvasItem } from "../designer/DraggableCanvasItem"
import { NumberField } from "../fields/NumberField"
import { Info } from "../template/Info"

interface NumberFieldAdapterProps {
  node: NumberFieldNode
}

export const NumberFieldAdapter = ({ node }: NumberFieldAdapterProps) => {
  const isDesigning = useIsDesigning()

  if (isDesigning) {
    return <DraggableCanvasItem node={node} />
  }
  return (
    <NumberField
      id={node.fieldId}
      label={node.label}
      extras={node.info && <Info>{node.info}</Info>}
      disabled={evalCodeToBoolean(node.disabled)}
      hidden={evalCodeToBoolean(node.hidden)}
      defaultValue={node.default}
      min={node.min}
      max={node.max}
      precision={node.precision}
      start={node.start}
      step={node.step}
    />
  )
}
