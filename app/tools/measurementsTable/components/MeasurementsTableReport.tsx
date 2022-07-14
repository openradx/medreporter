import { ReactNode } from "react"
import { Paragraph } from "../../../core/components/structuredReport/Paragraph"
import { useReportData } from "../../../core/contexts/ReportDataContext"

type MeasurementsData = {
  measurements: ReactNode
}

export const MeasurementsTableReport = () => {
  const { measurements } = useReportData(true) as MeasurementsData

  console.log(measurements)

  return <Paragraph>{measurements}</Paragraph>
}
