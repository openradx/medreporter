import { ReactNode } from "react"
import { useReportData } from "../../../contexts/ReportDataContext"
import { Paragraph } from "../../structuredReport/Paragraph"

type MeasurementsData = {
  measurements: ReactNode
}

export const MeasurementsTableReport = () => {
  const { measurements } = useReportData(true) as MeasurementsData

  console.log(measurements)

  return <Paragraph>{measurements}</Paragraph>
}
