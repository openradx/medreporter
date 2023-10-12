import { ReportEl } from "~/schemas/report"
import { MeasurementsOutputAdapter } from "./MeasurementsOutputAdapter"
import { ParagraphAdapter } from "./ParagraphAdapter"
import { StatementAdapter } from "./StatementAdapter"

interface ReportAdapterProps {
  element: ReportEl
}

export const ReportAdapter = ({ element }: ReportAdapterProps) =>
  element.children.map((child) => {
    switch (child.type) {
      case "Paragraph":
        return <ParagraphAdapter key={child.gid} element={child} />
      case "Statement":
        return <StatementAdapter key={child.gid} element={child} />
      case "MeasurementsOutput":
        return <MeasurementsOutputAdapter key={child.gid} element={child} />
      default:
        // @ts-ignore
        throw new Error(`Invalid report element type: ${child.type}`)
    }
  })
