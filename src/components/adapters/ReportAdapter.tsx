import { useIsDesigning } from "~/hooks/useIsDesigning"
import { ReportNode } from "~/schemas/report"
import { DroppableContainer } from "../designer/DroppableContainer"
import { Report } from "../template/Report"
import { MeasurementsOutputAdapter } from "./MeasurementsOutputAdapter"
import { ParagraphAdapter } from "./ParagraphAdapter"
import { StatementAdapter } from "./StatementAdapter"

interface ReportAdapterProps {
  node: ReportNode
}

export const ReportAdapter = ({ node }: ReportAdapterProps) => {
  const isDesigning = useIsDesigning()

  const children = node.children.map((child) => {
    switch (child.type) {
      case "Paragraph":
        return <ParagraphAdapter key={child.nodeId} node={child} />
      case "Statement":
        return <StatementAdapter key={child.nodeId} node={child} />
      case "MeasurementsOutput":
        return <MeasurementsOutputAdapter key={child.nodeId} node={child} />
      default:
        // @ts-ignore
        throw new Error(`Invalid report node with type: ${child.type}`)
    }
  })

  if (isDesigning) {
    return (
      <Report>
        <DroppableContainer node={node}>{children}</DroppableContainer>
      </Report>
    )
  }

  return <Report> {children} </Report>
}
