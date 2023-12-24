import { evalCodeToBoolean } from "~/medtl/interpreter"
import { FindingFieldNode } from "~/schemas/structure"
import { FindingField } from "../fields/FindingField"
import { Info } from "../template/Info"
import { DiscreteFieldAdapter } from "./DiscreteFieldAdapter"
import { GroupAdapter } from "./GroupAdapter"
import { HintAdapter } from "./HintAdapter"

interface FindingFieldAdapterProps {
  node: FindingFieldNode
}

export const FindingFieldAdapter = ({ node }: FindingFieldAdapterProps) => (
  <FindingField
    id={node.fieldId}
    label={node.label}
    extras={node.info && <Info>{node.info}</Info>}
    disabled={evalCodeToBoolean(node.disabled)}
    hidden={evalCodeToBoolean(node.hidden)}
    defaultValue={node.default}
  >
    {node.children.map((child) => {
      switch (child.type) {
        case "Hint":
          return <HintAdapter key={child.nodeId} node={child} />
        case "Group":
          return <GroupAdapter key={child.nodeId} node={child} />
        default:
          return <DiscreteFieldAdapter key={child.nodeId} node={child} />
      }
    })}
  </FindingField>
)
