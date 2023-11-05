import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { useDesigner } from "~/contexts/DesignerContext"
import { SectionNode } from "~/schemas/structure"
import { DroppableContainer } from "../designer/DroppableContainer"
import { Section } from "../template/Section"
import { DiscreteFieldAdapter } from "./DiscreteFieldAdapter"
import { FindingFieldAdapter } from "./FindingFieldAdapter"
import { GroupAdapter } from "./GroupAdapter"
import { HintAdapter } from "./HintAdapter"
import { LayoutAdapter } from "./LayoutAdapter"

interface SectionAdapterProps {
  node: SectionNode
}

export const SectionAdapter = ({ node }: SectionAdapterProps) => {
  const designer = useDesigner()

  const section = (
    <Section id={node.nodeId} label={node.label}>
      {node.children.map((child) => {
        switch (child.type) {
          case "FindingField":
            return <FindingFieldAdapter key={child.nodeId} node={child} />
          case "Group":
            return <GroupAdapter key={child.nodeId} node={child} />
          case "Layout":
            return <LayoutAdapter key={child.nodeId} node={child} />
          case "Hint":
            return <HintAdapter key={child.nodeId} node={child} />
          default:
            return <DiscreteFieldAdapter key={child.nodeId} node={child} />
        }
      })}
    </Section>
  )

  if (designer?.designMode) {
    return (
      <DroppableContainer node={node}>
        <SortableContext
          items={[...node.children.map((child) => child.nodeId)]}
          strategy={verticalListSortingStrategy}
        >
          {section}
        </SortableContext>
      </DroppableContainer>
    )
  }

  return section
}
