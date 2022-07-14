import { ReactNode } from "react"
import { createRequiredContext } from "../utils/createRequiredContext"
import { useModule } from "./ModuleContext"

type ReportDataContext = Record<string, Record<string, ReactNode>>

const [_useReportData, ReportDataContextProvider] =
  createRequiredContext<ReportDataContext>("ReportDataContext")

export { ReportDataContextProvider }

export function useReportData(moduleId: true): Record<string, ReactNode>
export function useReportData(moduleId: true, fieldId: string): ReactNode
export function useReportData(moduleId: string): Record<string, ReactNode>
export function useReportData(moduleId: string, fieldId: string): ReactNode
export function useReportData(): Record<string, Record<string, ReactNode>>
export function useReportData(moduleId: boolean | string = false, fieldId?: string) {
  const data = _useReportData()
  const { id } = useModule()

  if (moduleId === true && fieldId === undefined) {
    return data[id]
  }

  if (moduleId === true && fieldId !== undefined) {
    return data[id][fieldId]
  }

  if (typeof moduleId === "string" && fieldId === undefined) {
    return data[moduleId]
  }

  if (typeof moduleId === "string" && fieldId !== undefined) {
    return data[moduleId][fieldId]
  }

  return data
}
