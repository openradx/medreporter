import { HintNode } from "~/schemas/structure"
import { Hint } from "../template/Hint"

interface HintAdapterProps {
  node: HintNode
}

export const HintAdapter = ({ node }: HintAdapterProps) => (
  <Hint level={node.level}>{node.content}</Hint>
)
