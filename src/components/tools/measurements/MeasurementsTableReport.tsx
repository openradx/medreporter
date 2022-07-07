import { useReportData } from "../../../contexts/ReportDataContext"
import { MeasurementsTransformed } from "../../fields/fieldTypes"

type MeasurementsData = {
  measurements: MeasurementsTransformed
}

export const MeasurementsTableReport = () => {
  const { measurements } = useReportData<MeasurementsData>("measurements")

  console.log(measurements)

  return null
}
