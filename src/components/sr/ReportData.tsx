import copy from "fast-copy"
import { ReactNode, useMemo } from "react"
import { ReportDataContextProvider } from "~/contexts/ReportDataContext"
import { useTransformerRegistry } from "~/contexts/TransformerRegistryContext"
import { useStructureData } from "~/hooks/useStructureData"

interface ReportDataProps {
  children: ReactNode
}

export const ReportData = ({ children }: ReportDataProps) => {
  const registry = useTransformerRegistry()
  const structureData = useStructureData()

  const reportData = useMemo(() => {
    const copiedData = copy(structureData)
    registry.forEach((transformers) => {
      transformers.forEach((transform) => {
        transform(copiedData)
      })
    })
    return copiedData
  }, [registry, structureData])

  return <ReportDataContextProvider value={reportData}>{children}</ReportDataContextProvider>
}
