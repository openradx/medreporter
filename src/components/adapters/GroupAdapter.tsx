import { useIsDesigning } from "~/hooks/useIsDesigning"
import { GroupNode } from "~/schemas/structure"
import { DraggableCanvasContainer } from "../designer/DraggableCanvasContainer"
import { NodeGroup } from "../node_fields/NodeGroup"
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

  return (
    <NodeGroup
      fieldId={node.nodeId}
      label={node.label}
      info={node.info}
      disabled={node.disabled}
      hidden={node.hidden}
      direction={node.direction}
      border={node.border}
    >
      {children}
    </NodeGroup>
  )
}
