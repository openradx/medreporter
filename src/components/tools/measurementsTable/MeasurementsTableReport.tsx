import { MeasurementsOutput } from "~/components/outputs/MeasurementsOutput"
import { Report } from "~/components/template/Report"
import { useStructureData } from "~/hooks/useStructureData"
import { MeasurementsData } from "~/types/measurements"

type MeasurementsTableData = {
  measurements: MeasurementsData
}

export const MeasurementsTableReport = () => {
  const { measurements } = useStructureData() as MeasurementsTableData

  return (
    <Report>
      <MeasurementsOutput fieldId="measurements" data={measurements} />
    </Report>
  )
}
