import { evalCodeToBoolean } from "~/medtl/interpreter"
import { ParagraphEl } from "~/schemas/report"
import { Paragraph } from "../template/Paragraph"
import { StatementAdapter } from "./StatementAdapter"

interface ParagraphAdapterProps {
  element: ParagraphEl
}

export const ParagraphAdapter = ({ element }: ParagraphAdapterProps) => (
  <Paragraph
    title={element.title}
    fieldId={element.fieldId}
    hidden={evalCodeToBoolean(element.hidden)}
    list={element.list}
  >
    {element.children.map((child) => (
      <StatementAdapter key={child.gid} element={child} />
    ))}
  </Paragraph>
)
