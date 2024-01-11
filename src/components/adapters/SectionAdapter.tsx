import { useIsDesigning } from "~/hooks/useIsDesigning"
import { SectionNode } from "~/schemas/structure"
import { DroppableCanvasContainer } from "../designer/DroppableCanvasContainer"
import { Section } from "../template/Section"
import { DiscreteFieldAdapter } from "./DiscreteFieldAdapter"
import { FindingFieldAdapter } from "./FindingFieldAdapter"
import { GroupAdapter } from "./GroupAdapter"
import { HintAdapter } from "./HintAdapter"

interface SectionAdapterProps {
  node: SectionNode
  active: boolean
}

export const SectionAdapter = ({ node, active }: SectionAdapterProps) => {
  const isDesigning = useIsDesigning()

  const children = node.children.map((child) => {
    switch (child.type) {
      case "Hint":
        return <HintAdapter key={child.nodeId} node={child} />
      case "Group":
        return <GroupAdapter key={child.nodeId} node={child} />
      case "FindingField":
        return <FindingFieldAdapter key={child.nodeId} node={child} />
      default:
        return <DiscreteFieldAdapter key={child.nodeId} node={child} />
    }
  })

  if (isDesigning) {
    return (
      <Section id={node.nodeId} label={node.label} active={active} isDesigning={isDesigning}>
        <DroppableCanvasContainer node={node}>{children}</DroppableCanvasContainer>
      </Section>
    )
  }

  return (
    <Section id={node.nodeId} label={node.label} active={active} isDesigning={isDesigning}>
      {children}
    </Section>
  )
}
