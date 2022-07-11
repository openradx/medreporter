import { useReportTranslation } from "../../hooks/useReportTranslation"
import { MeasurementsData } from "../inputs/MeasurementsInput/measurementsTypes"
import { MeasurementsOutputHtml } from "./MeasurementsOutputHtml"
import { MeasurementsOutputText } from "./MeasurmentsOutputText"

interface MeasurementsOutputProps {
  format: "html" | "text"
  data: MeasurementsData
  stats: string
  label: string
}

export const MeasurementsOutput = ({ format, ...rest }: MeasurementsOutputProps) => {
  const { t } = useReportTranslation()

  const labels = {
    previous: t("MeasurementsOutput.previous"),
    current: t("MeasurementsOutput.current"),
    location: t("MeasurementsOutput.location"),
    reference: t("MeasurementsOutput.reference"),
  }

  if (format === "html") {
    return <MeasurementsOutputHtml labels={labels} {...rest} />
  }

  if (format === "text") {
    return <MeasurementsOutputText labels={labels} {...rest} />
  }

  throw new Error(`Invalid report format: ${format}`)
}
