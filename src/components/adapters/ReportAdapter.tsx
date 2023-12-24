import { ReportNode } from "~/schemas/report"
import { selectEditing } from "~/state/designerSlice"
import { useAppSelector } from "~/state/store"
import { DroppableContainer } from "../designer/DroppableContainer"
import { Report } from "../template/Report"
import { MeasurementsOutputAdapter } from "./MeasurementsOutputAdapter"
import { ParagraphAdapter } from "./ParagraphAdapter"
import { StatementAdapter } from "./StatementAdapter"

interface ReportAdapterProps {
  node: ReportNode
}

export const ReportAdapter = ({ node }: ReportAdapterProps) => {
  const editing = useAppSelector(selectEditing)

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

  if (editing) {
    return (
      <Report>
        <DroppableContainer node={node}>{children}</DroppableContainer>
      </Report>
    )
  }

  return <Report> {children} </Report>
}
