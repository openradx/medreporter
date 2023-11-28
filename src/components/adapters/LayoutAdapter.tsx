import { LayoutNode } from "~/schemas/structure"
import { selectEditing } from "~/state/designerSlice"
import { useAppSelector } from "~/state/store"
import { DesignerContainerItem } from "../designer/DesignerContainerItem"
import { DroppableContainer } from "../designer/DroppableContainer"
import { Layout } from "../template/Layout"
import { DiscreteFieldAdapter } from "./DiscreteFieldAdapter"
import { HintAdapter } from "./HintAdapter"

interface LayoutAdapterProps {
  node: LayoutNode
}

export const LayoutAdapter = ({ node }: LayoutAdapterProps) => {
  const editing = useAppSelector(selectEditing)

  const content = node.children.map((child) => {
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
    return (
      <DroppableContainer node={node} direction={node.direction ?? "row"}>
        <DesignerContainerItem node={node}>{content}</DesignerContainerItem>
      </DroppableContainer>
    )
  }

  return (
    <Layout direction={node.direction} justify={node.justify} nowrap={node.nowrap}>
      {content}
    </Layout>
  )
}
