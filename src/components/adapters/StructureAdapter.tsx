import { StructureNode } from "~/schemas/structure"
import { Structure } from "../template/Structure"
import { SectionAdapter } from "./SectionAdapter"

interface StructureAdapterProps {
  node: StructureNode
}

export const StructureAdapter = ({ node }: StructureAdapterProps) => (
  <Structure>
    {node.children.map((child) => (
      <SectionAdapter key={child.nodeId} node={child} />
    ))}
  </Structure>
)
