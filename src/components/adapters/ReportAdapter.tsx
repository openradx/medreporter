import { ReportNode } from "~/schemas/report"
import { MeasurementsOutputAdapter } from "./MeasurementsOutputAdapter"
import { ParagraphAdapter } from "./ParagraphAdapter"
import { StatementAdapter } from "./StatementAdapter"

interface ReportAdapterProps {
  node: ReportNode
}

export const ReportAdapter = ({ node }: ReportAdapterProps) =>
  node.children.map((child) => {
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
