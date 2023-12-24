import { evalCodeToBoolean } from "~/medtl/interpreter"
import { BooleanFieldNode } from "~/schemas/structure"
import { selectEditing } from "~/state/designerSlice"
import { useAppSelector } from "~/state/store"
import { DraggableCanvasItem } from "../designer/DraggableCanvasItem"
import { BooleanField } from "../fields/BooleanField"
import { Info } from "../template/Info"

interface BooleanFieldAdapterProps {
  node: BooleanFieldNode
}

export const BooleanFieldAdapter = ({ node }: BooleanFieldAdapterProps) => {
  const editing = useAppSelector(selectEditing)

  if (editing) {
    return <DraggableCanvasItem node={node} />
  }

  return (
    <BooleanField
      id={node.fieldId}
      label={node.label}
      extras={node.info && <Info>{node.info}</Info>}
      disabled={evalCodeToBoolean(node.disabled)}
      hidden={evalCodeToBoolean(node.hidden)}
      defaultValue={node.default}
    />
  )
}
