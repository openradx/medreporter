import { ReactNode } from "react"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { useStructureLink } from "~/hooks/useStructureLink"
import { MeasurementsData } from "~/schemas/structure"
import { selectOutputFormat } from "~/state/displaySlice"
import { useAppSelector } from "~/state/store"
import { selectStructureHistoryData } from "~/state/structureHistoryDataSlice"
import { StructureLink } from "../template/StructureLink"
import { MeasurementsOutputHtml } from "./MeasurementsOutputHtml"
import { MeasurementsOutputPlain } from "./MeasurmentsOutputPlain"

interface MeasurementsOutputProps {
  link: string
  linkedMeasurementsField: string
  legend?: string
  stats?: string
  previousLabel?: string
  currentLabel?: string
  locationLabel?: string
  referenceLabel?: string
}

export const MeasurementsOutput = ({
  linkedMeasurementsField,
  link,
  legend = "",
  stats = "",
  previousLabel,
  currentLabel,
  locationLabel,
  referenceLabel,
}: MeasurementsOutputProps) => {
  const { activateLink } = useStructureLink({ link })
  const outputFormat = useAppSelector(selectOutputFormat)
  const structureData = useAppSelector(selectStructureHistoryData)
  const { t } = useSiteTranslation()

  if (!(linkedMeasurementsField in structureData)) {
    return null
  }

  const measurementsData = structureData[linkedMeasurementsField] as MeasurementsData

  const labels = {
    previous: previousLabel || t("MeasurementsOutput.columnPrevious"),
    current: currentLabel || t("MeasurementsOutput.columnCurrent"),
    location: locationLabel || t("MeasurementsOutput.columnLocation"),
    reference: referenceLabel || t("MeasurementsOutput.columnReference"),
  }

  let output: ReactNode
  if (outputFormat === "html") {
    output = (
      <MeasurementsOutputHtml legend={legend} {...{ data: measurementsData, labels, stats }} />
    )
  } else if (outputFormat === "plain") {
    output = (
      <MeasurementsOutputPlain legend={legend} {...{ data: measurementsData, labels, stats }} />
    )
  } else {
    throw new Error(`Invalid output format: ${outputFormat}`)
  }

  return <StructureLink onClick={activateLink}>{output}</StructureLink>
}
