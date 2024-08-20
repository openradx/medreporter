import { useIsDesigning } from "~/hooks/useIsDesigning"
import { FindingFieldNode } from "~/schemas/structure"
import { DraggableCanvasContainer } from "../designer/DraggableCanvasContainer"
import { FindingFieldInstance } from "../field_instances/FindingFieldInstance"
import { DiscreteFieldAdapter } from "./DiscreteFieldAdapter"
import { GroupAdapter } from "./GroupAdapter"
import { HintAdapter } from "./HintAdapter"

interface FindingFieldAdapterProps {
  node: FindingFieldNode
}

export const FindingFieldAdapter = ({ node }: FindingFieldAdapterProps) => {
  const isDesigning = useIsDesigning()

  const children = node.children.map((child) => {
    switch (child.type) {
      case "Hint":
        return <HintAdapter key={child.nodeId} node={child} />
      case "Group":
        return <GroupAdapter key={child.nodeId} node={child} />
      default:
        return <DiscreteFieldAdapter key={child.nodeId} node={child} />
    }
  })

  if (isDesigning) {
    return <DraggableCanvasContainer node={node}>{children}</DraggableCanvasContainer>
  }
  return <FindingFieldInstance node={node}>{children}</FindingFieldInstance>
}
