import { useIsDesigning } from "~/hooks/useIsDesigning"
import { evalCodeToBoolean } from "~/medtl/interpreter"
import { GroupNode } from "~/schemas/structure"
import { DraggableCanvasContainer } from "../designer/DraggableCanvasContainer"
import { Group } from "../template/Group"
import { Info } from "../template/Info"
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
    <Group
      label={node.label}
      extras={node.info && <Info>{node.info}</Info>}
      disabled={evalCodeToBoolean(node.disabled)}
      hidden={evalCodeToBoolean(node.hidden)}
      border={node.border}
      direction={node.direction}
      justify={node.justify}
    >
      {}
    </Group>
  )
}
