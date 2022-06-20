import { createRequiredContext } from "../utils/createRequiredContext"

type ReportDataContext = Record<string, Record<string, any>>

const [_useReportData, ReportDataContextProvider] =
  createRequiredContext<ReportDataContext>("ReportDataContext")

export { ReportDataContextProvider }

export const useReportData = (moduleId?: string) => {
  const data = _useReportData()
  if (moduleId) {
    return data[moduleId]
  }
  return data
}
