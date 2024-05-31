import { useIsDesigning } from "~/hooks/useIsDesigning"
import { GroupNode } from "~/schemas/structure"
import { DraggableCanvasContainer } from "../designer/DraggableCanvasContainer"
import { GroupInstance } from "../field_instances/GroupInstance"
import { DiscreteFieldAdapter } from "./DiscreteFieldAdapter"
import { HintAdapter } from "./HintAdapter"

interface GroupAdapterProps {
  node: GroupNode
}

export const GroupAdapter = ({ node }: GroupAdapterProps) => {
  const isDesigning = useIsDesigning()
  const children = node.children.map((child) => {
    switch (child.type) {
      case "Hint":
        return <HintAdapter key={child.nodeId} node={child} />
      default:
        return <DiscreteFieldAdapter key={child.nodeId} node={child} />
    }
  })

  if (isDesigning) {
    return <DraggableCanvasContainer node={node}>{children}</DraggableCanvasContainer>
  }

  return <GroupInstance node={node}>{children}</GroupInstance>
}
