import { useReportTranslation } from "~/hooks/useReportTranslation"
import { OutputFormat } from "~/types/general"
import { MeasurementsData } from "../../types/measurements"
import { MeasurementsOutputHtml } from "./MeasurementsOutputHtml"
import { MeasurementsOutputPlain } from "./MeasurmentsOutputPlain"

interface MeasurementsOutputProps {
  format: OutputFormat
  data: MeasurementsData
  label?: string
  stats?: string
}

export const MeasurementsOutput = ({
  format,
  data,
  label = "",
  stats = "",
}: MeasurementsOutputProps) => {
  const { t } = useReportTranslation()

  const labels = {
    previous: t("MeasurementsOutput.columnPrevious"),
    current: t("MeasurementsOutput.columnCurrent"),
    location: t("MeasurementsOutput.columnLocation"),
    reference: t("MeasurementsOutput.columnReference"),
  }

  if (format === "html") {
    return <MeasurementsOutputHtml title={label} {...{ data, labels, stats }} />
  }

  if (format === "plain") {
    return <MeasurementsOutputPlain title={label} {...{ data, labels, stats }} />
  }

  throw new Error(`Invalid report format: ${format}`)
}
