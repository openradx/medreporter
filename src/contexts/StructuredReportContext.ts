import { createRequiredContext } from "../utils/createRequiredContext"

interface StructuredReportContext {
  context: "structure" | "report"
}

export const [useStructuredReport, StructuredReportContextProvider] =
  createRequiredContext<StructuredReportContext>("StructuredReportContext")
