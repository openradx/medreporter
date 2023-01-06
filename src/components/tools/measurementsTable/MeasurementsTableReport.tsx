import { ReactNode } from "react"
import { Paragraph } from "~/components/sr/Paragraph"
import { useReportData } from "~/contexts/ReportDataContext"

type MeasurementsData = {
  measurements: ReactNode
}

export const MeasurementsTableReport = () => {
  const { measurements } = useReportData(true) as MeasurementsData

  return <Paragraph>{measurements}</Paragraph>
}
