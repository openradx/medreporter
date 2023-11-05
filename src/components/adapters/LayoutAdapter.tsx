import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { useDesigner } from "~/contexts/DesignerContext"
import { LayoutNode } from "~/schemas/structure"
import { DesignerContainerItem } from "../designer/DesignerContainerItem"
import { DroppableContainer } from "../designer/DroppableContainer"
import { SortableItem } from "../designer/SortableItem"
import { Layout } from "../template/Layout"
import { DiscreteFieldAdapter } from "./DiscreteFieldAdapter"
import { HintAdapter } from "./HintAdapter"

interface LayoutAdapterProps {
  node: LayoutNode
}

export const LayoutAdapter = ({ node }: LayoutAdapterProps) => {
  const designer = useDesigner()

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

  if (designer?.designMode) {
    return (
      <SortableItem node={node}>
        <DroppableContainer node={node}>
          <DesignerContainerItem node={node}>
            <SortableContext
              items={[...node.children.map((child) => child.nodeId)]}
              strategy={verticalListSortingStrategy}
            >
              {content}
            </SortableContext>
          </DesignerContainerItem>
        </DroppableContainer>
      </SortableItem>
    )
  }

  return (
    <Layout direction={node.direction} justify={node.justify} nowrap={node.nowrap}>
      {content}
    </Layout>
  )
}
