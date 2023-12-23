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
    <Statement link={node.link} content={node.content}/>   )
}
