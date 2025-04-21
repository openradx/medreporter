import { useLingui } from "@lingui/react/macro"
import { Box } from "@mantine/core"
import { ReactNode } from "react"
import { useStructureLink } from "~/hooks/useStructureLink"
import { MeasurementsData } from "~/schemas/structure"
import { selectOutputFormat } from "~/state/displaySlice"
import { useAppSelector } from "~/state/store"
import { StructureLink } from "../template/StructureLink"
import { MeasurementsOutputHtml } from "./MeasurementsOutputHtml"
import { MeasurementsOutputPlain } from "./MeasurmentsOutputPlain"

interface MeasurementsOutputProps {
  link: string
  data?: MeasurementsData
  legend?: string
  stats?: string
  previousLabel?: string
  currentLabel?: string
  locationLabel?: string
  referenceLabel?: string
  hidden?: boolean
}

export const MeasurementsOutput = ({
  link,
  data,
  legend = "",
  stats = "",
  previousLabel,
  currentLabel,
  locationLabel,
  referenceLabel,
  hidden = false,
}: MeasurementsOutputProps) => {
  const { activateLink } = useStructureLink({ link })
  const outputFormat = useAppSelector(selectOutputFormat)
  const { t } = useLingui()

  if (!data) return null

  const labels = {
    previous: previousLabel || t`Previous`,
    current: currentLabel || t`Current`,
    location: locationLabel || t`Location`,
    reference: referenceLabel || t`Reference`,
  }

  let output: ReactNode
  if (outputFormat === "html") {
    output = <MeasurementsOutputHtml legend={legend} {...{ data, labels, stats }} />
  } else if (outputFormat === "plain") {
    output = <MeasurementsOutputPlain legend={legend} {...{ data, labels, stats }} />
  } else {
    throw new Error(t`Invalid output format: ${outputFormat}`)
  }

  return (
    <Box display={hidden ? "none" : undefined}>
      <StructureLink onClick={activateLink}>{output}</StructureLink>
    </Box>
  )
}
