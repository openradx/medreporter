import { ReactNode } from "react"
import { Paragraph } from "app/core/components/structuredReport/Paragraph"
import { useReportData } from "app/core/contexts/ReportDataContext"

type MeasurementsData = {
  measurements: ReactNode
}

export const MeasurementsTableReport = () => {
  const { measurements } = useReportData(true) as MeasurementsData

  return <Paragraph>{measurements}</Paragraph>
}
