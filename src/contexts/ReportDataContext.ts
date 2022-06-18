import { createRequiredContext } from "../utils/createRequiredContext"

type ReportDataContext = Record<string, Record<string, any>>

export const [useReportData, ReportDataContextProvider] =
  createRequiredContext<ReportDataContext>("ReportDataContext")
