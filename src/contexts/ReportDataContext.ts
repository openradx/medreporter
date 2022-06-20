import { createRequiredContext } from "../utils/createRequiredContext"

type ReportDataContext = Record<string, Record<string, any>>

const [_useReportData, ReportDataContextProvider] =
  createRequiredContext<ReportDataContext>("ReportDataContext")

export { ReportDataContextProvider }

export const useReportData = <T>(moduleId?: string) => {
  const data = _useReportData()
  if (moduleId) {
    return data[moduleId] as T
  }
  return data as unknown as T
}
