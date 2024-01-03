import { useIsDesigning } from "~/hooks/useIsDesigning"
import { evalCodeToBoolean } from "~/medtl/interpreter"
import { MultipleChoiceFieldNode } from "~/schemas/structure"
import { DraggableCanvasItem } from "../designer/DraggableCanvasItem"
import { MultipleChoiceField } from "../fields/MultipleChoiceField"
import { Figure } from "../template/Figure"
import { Info } from "../template/Info"

interface MultipleChoiceFieldAdapterProps {
  node: MultipleChoiceFieldNode
}

export const MultipleChoiceFieldAdapter = ({ node }: MultipleChoiceFieldAdapterProps) => {
  const isDesigning = useIsDesigning()

  if (isDesigning) {
    return <DraggableCanvasItem node={node} />
  }

  const extras = (
    <>
      {node.info?.trim() && <Info>{node.info}</Info>}
      {node.figure?.trim() && <Figure>{node.figure}</Figure>}
    </>
  )

  return (
    <MultipleChoiceField
      id={node.fieldId}
      label={node.label}
      variant={node.variant}
      extras={extras}
      disabled={evalCodeToBoolean(node.disabled)}
      hidden={evalCodeToBoolean(node.hidden)}
      options={node.options}
      defaultValue={node.default}
    />
  )
}
