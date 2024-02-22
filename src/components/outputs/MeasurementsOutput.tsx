import { ReactNode } from "react"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { useStructureLink } from "~/hooks/useStructureLink"
import { MeasurementsData } from "~/schemas/structure"
import { selectOutputFormat } from "~/state/displaySlice"
import { useAppSelector } from "~/state/store"
import { StructureLink } from "../template/StructureLink"
import { MeasurementsOutputHtml } from "./MeasurementsOutputHtml"
import { MeasurementsOutputPlain } from "./MeasurmentsOutputPlain"

interface MeasurementsOutputProps {
  fieldId: string
  data: MeasurementsData
  legend?: string
  stats?: string
  previousLabel?: string
  currentLabel?: string
  locationLabel?: string
  referenceLabel?: string
}

export const MeasurementsOutput = ({
  fieldId,
  data,
  legend = "",
  stats = "",
  previousLabel,
  currentLabel,
  locationLabel,
  referenceLabel,
}: MeasurementsOutputProps) => {
  const { activateLink } = useStructureLink({ link: fieldId })
  const outputFormat = useAppSelector(selectOutputFormat)
  const { t } = useSiteTranslation()

  const labels = {
    previous: previousLabel || t("MeasurementsOutput.columnPrevious"),
    current: currentLabel || t("MeasurementsOutput.columnCurrent"),
    location: locationLabel || t("MeasurementsOutput.columnLocation"),
    reference: referenceLabel || t("MeasurementsOutput.columnReference"),
  }

  let output: ReactNode
  if (outputFormat === "html") {
    output = <MeasurementsOutputHtml legend={legend} {...{ data, labels, stats }} />
  } else if (outputFormat === "plain") {
    output = <MeasurementsOutputPlain legend={legend} {...{ data, labels, stats }} />
  } else {
    throw new Error(`Invalid output format: ${outputFormat}`)
  }

  return <StructureLink onClick={activateLink}>{output}</StructureLink>
}
