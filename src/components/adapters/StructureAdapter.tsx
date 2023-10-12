import { StructureEl } from "~/schemas/structure"
import { SectionAdapter } from "./SectionAdapter"

interface StructureAdapterProps {
  element: StructureEl
}

export const StructureAdapter = ({ element }: StructureAdapterProps) =>
  element.children.map((child) => <SectionAdapter key={child.gid} element={child} />)
