import { useIsDesigning } from "~/hooks/useIsDesigning"
import { evalCodeToBoolean } from "~/medtl/interpreter"
import { SingleChoiceFieldNode } from "~/schemas/structure"
import { DraggableCanvasItem } from "../designer/DraggableCanvasItem"
import { SingleChoiceField } from "../fields/SingleChoiceField"
import { Figure } from "../template/Figure"
import { Info } from "../template/Info"

interface SingleChoiceFieldAdapterProps {
  node: SingleChoiceFieldNode
}

export const SingleChoiceFieldAdapter = ({ node }: SingleChoiceFieldAdapterProps) => {
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
    <SingleChoiceField
      id={node.fieldId}
      label={node.label}
      extras={extras}
      disabled={evalCodeToBoolean(node.disabled)}
      hidden={evalCodeToBoolean(node.hidden)}
      options={node.options}
      defaultValue={node.default}
    />
  )
}
