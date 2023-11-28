import { SectionNode } from "~/schemas/structure"
import { selectEditing } from "~/state/designerSlice"
import { useAppSelector } from "~/state/store"
import { DroppableContainer } from "../designer/DroppableContainer"
import { Section } from "../template/Section"
import { DiscreteFieldAdapter } from "./DiscreteFieldAdapter"
import { FindingFieldAdapter } from "./FindingFieldAdapter"
import { GroupAdapter } from "./GroupAdapter"
import { HintAdapter } from "./HintAdapter"
import { LayoutAdapter } from "./LayoutAdapter"

interface SectionAdapterProps {
  node: SectionNode
  active: boolean
}

export const SectionAdapter = ({ node, active }: SectionAdapterProps) => {
  const editing = useAppSelector(selectEditing)

  const children = node.children.map((child) => {
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
  })

  const section = (
    <Section id={node.nodeId} label={node.label} active={active}>
      {children}
    </Section>
  )

  if (editing) {
    return (
      <DroppableContainer node={node} direction="column">
        {section}
      </DroppableContainer>
    )
  }

  return section
}
