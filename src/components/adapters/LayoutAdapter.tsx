import { LayoutNode } from "~/schemas/structure"
import { selectEditing } from "~/state/designerSlice"
import { useAppSelector } from "~/state/store"
import { DraggableCanvasItem } from "../designer/DraggableCanvasItem"
import { Layout } from "../template/Layout"
import { DiscreteFieldAdapter } from "./DiscreteFieldAdapter"
import { HintAdapter } from "./HintAdapter"

interface LayoutAdapterProps {
  node: LayoutNode
}

export const LayoutAdapter = ({ node }: LayoutAdapterProps) => {
  const editing = useAppSelector(selectEditing)

  const children = node.children.map((child) => {
    switch (child.type) {
      case "Layout":
        return <LayoutAdapter key={child.nodeId} node={child} />
      case "Hint":
        return <HintAdapter key={child.nodeId} node={child} />
      default:
        return <DiscreteFieldAdapter key={child.nodeId} node={child} />
    }
  })

  if (editing) {
    return <DraggableCanvasItem node={node}>{children}</DraggableCanvasItem>
  }

  return (
    <Layout direction={node.direction} justify={node.justify} nowrap={node.nowrap}>
      {children}
    </Layout>
  )
}
