import { evalCodeToBoolean } from "~/medtl/interpreter"
import { FreeTextFieldNode } from "~/schemas/structure"
import { selectEditing } from "~/state/designerSlice"
import { useAppSelector } from "~/state/store"
import { DraggableCanvasItem } from "../designer/DraggableCanvasItem"
import { FreeTextField } from "../fields/FreeTextField"
import { Info } from "../template/Info"

interface FreeTextFieldAdapterProps {
  node: FreeTextFieldNode
}

export const FreeTextFieldAdapter = ({ node }: FreeTextFieldAdapterProps) => {
  const editing = useAppSelector(selectEditing)

  if (editing) {
    return <DraggableCanvasItem node={node} />
  }

  return (
    <FreeTextField
      id={node.fieldId}
      label={node.label}
      extras={node.info && <Info>{node.info}</Info>}
      disabled={evalCodeToBoolean(node.disabled)}
      hidden={evalCodeToBoolean(node.hidden)}
      defaultValue={node.default}
      multiline={node.multiline}
    />
  )
}
