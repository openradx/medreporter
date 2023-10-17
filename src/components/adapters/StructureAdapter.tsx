import { StructureEl } from "~/schemas/structure"
import { Structure } from "../template/Structure"
import { SectionAdapter } from "./SectionAdapter"

interface StructureAdapterProps {
  element: StructureEl
}

export const StructureAdapter = ({ element }: StructureAdapterProps) => (
  <Structure>
    {element.children.map((child) => (
      <SectionAdapter key={child.gid} element={child} />
    ))}
  </Structure>
)
