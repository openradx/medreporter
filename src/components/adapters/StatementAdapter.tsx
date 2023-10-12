import { StatementEl } from "~/schemas/report"
import { Statement } from "../template/Statement"

interface StatementAdapterProps {
  element: StatementEl
}

export const StatementAdapter = ({ element }: StatementAdapterProps) => (
  <Statement fieldId={element.fieldId}>{element.content}</Statement>
)
