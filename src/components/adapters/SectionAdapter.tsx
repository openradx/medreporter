import { SectionEl } from "~/schemas/structure"
import { DroppableContainer } from "../editor/DroppableContainer"
import { Section } from "../template/Section"
import { DiscreteFieldAdapter } from "./DiscreteFieldAdapter"
import { FindingFieldAdapter } from "./FindingFieldAdapter"
import { GroupAdapter } from "./GroupAdapter"
import { HintAdapter } from "./HintAdapter"
import { LayoutAdapter } from "./LayoutAdapter"

interface SectionAdapterProps {
  element: SectionEl
}

export const SectionAdapter = ({ element }: SectionAdapterProps) => (
  <DroppableContainer id={element.gid}>
    <Section id={element.gid} label={element.label}>
      {element.children.map((child) => {
        switch (child.type) {
          case "FindingField":
            return <FindingFieldAdapter key={child.gid} element={child} />
          case "Group":
            return <GroupAdapter key={child.gid} element={child} />
          case "Layout":
            return <LayoutAdapter key={child.gid} element={child} />
          case "Hint":
            return <HintAdapter key={child.gid} element={child} />
          default:
            return <DiscreteFieldAdapter key={child.gid} element={child} />
        }
      })}
    </Section>
  </DroppableContainer>
)
