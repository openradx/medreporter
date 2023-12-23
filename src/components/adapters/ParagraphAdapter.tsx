import { evalCodeToBoolean } from "~/medtl/interpreter"
import { ParagraphNode } from "~/schemas/report"
import { selectEditing } from "~/state/designerSlice"
import { useAppSelector } from "~/state/store"
import { DraggableCanvasItem } from "../designer/DraggableCanvasItem"
import { Paragraph } from "../template/Paragraph"
import { StatementAdapter } from "./StatementAdapter"

interface ParagraphAdapterProps {
  node: ParagraphNode
}

export const ParagraphAdapter = ({ node }: ParagraphAdapterProps) => {
  const editing = useAppSelector(selectEditing)

  const children = node.children.map((child) => (
    <StatementAdapter key={child.nodeId} node={child} />
  ))

  if (editing) {
    return <DraggableCanvasItem node={node}>{children}</DraggableCanvasItem>
  }

  return (
    <Paragraph
      title={node.title}
      link={node.link}
      hidden={evalCodeToBoolean(node.hidden)}
      list={node.list}
    >
      {children}
    </Paragraph>
  )
}
