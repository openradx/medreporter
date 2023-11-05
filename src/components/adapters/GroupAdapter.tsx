import { evalCodeToBoolean } from "~/medtl/interpreter"
import { GroupNode } from "~/schemas/structure"
import { Group } from "../template/Group"
import { Info } from "../template/Info"
import { DiscreteFieldAdapter } from "./DiscreteFieldAdapter"
import { HintAdapter } from "./HintAdapter"
import { LayoutAdapter } from "./LayoutAdapter"

interface GroupAdapterProps {
  node: GroupNode
}

export const GroupAdapter = ({ node }: GroupAdapterProps) => (
  <Group
    label={node.label}
    extras={node.info && <Info>{node.info}</Info>}
    disabled={evalCodeToBoolean(node.disabled)}
    hidden={evalCodeToBoolean(node.hidden)}
  >
    {node.children.map((child) => {
      switch (child.type) {
        case "Layout":
          return <LayoutAdapter key={child.nodeId} node={child} />
        case "Hint":
          return <HintAdapter key={child.nodeId} node={child} />
        default:
          return <DiscreteFieldAdapter key={child.nodeId} node={child} />
      }
    })}
  </Group>
)
