import { evalCodeToBoolean } from "~/medtl/interpreter"
import { StatementNode } from "~/schemas/report"
import { selectEditing } from "~/state/designerSlice"
import { useAppSelector } from "~/state/store"
import { DraggableCanvasItem } from "../designer/DraggableCanvasItem"
import { Statement } from "../template/Statement"

interface StatementAdapterProps {
  node: StatementNode
}

export const StatementAdapter = ({ node }: StatementAdapterProps) => {
  const editing = useAppSelector(selectEditing)

  if (editing) {
    return <DraggableCanvasItem node={node} />
  }
  return (
    <Statement link={node.link} hidden={evalCodeToBoolean(node.hidden)} content={node.content} />
  )
}
