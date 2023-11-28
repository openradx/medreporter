import { StructureNode } from "~/schemas/structure"
import { selectActiveSectionId } from "~/state/displaySlice"
import { useAppSelector } from "~/state/store"
import { Structure } from "../template/Structure"
import { SectionAdapter } from "./SectionAdapter"

interface StructureAdapterProps {
  node: StructureNode
}

export const StructureAdapter = ({ node }: StructureAdapterProps) => {
  const activeSectionId = useAppSelector(selectActiveSectionId)

  return (
    <Structure>
      {node.children.map((child, index) => (
        <SectionAdapter
          key={child.nodeId}
          node={child}
          active={activeSectionId === null ? index === 0 : activeSectionId === child.nodeId}
        />
      ))}
    </Structure>
  )
}
