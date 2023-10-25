import { Paragraph } from "~/components/template/Paragraph"
import { Report } from "~/components/template/Report"
import { Statement } from "~/components/template/Statement"
import { useMicroTranslation } from "~/hooks/useMicroTranslation"
import { useStructureData } from "~/hooks/useStructureData"
import { i18nReport } from "./locales"
import { defineLungRads2022 } from "./lungRads2022Utils"

export type LungRads2022Data = {
  timepoint: "baseline" | "follow-up"
  problematicExam: "prior-CT-not-available" | "not-evaluable" | "infectious" | "none"
  nodule: boolean
  benignFeatures: "calcification" | "fat" | "none"
  structure: "solid" | "groundglass" | "partsolid"
  featuresSolid: "smooth-margins" | "subsegmental-airway" | "segmental-airway" | "none"
  longaxis: number | null
  shortaxis: number | null
  longaxisSolid: number | null
  shortaxisSolid: number | null
  dynamic: "new" | "stable" | "slowly-growing" | "growing" | "decreasing"
  cyst: boolean
  wall: "thin" | "thick"
  formation: "unilocular" | "multilocular"
  dynamicUnilocular: "stable" | "cyst-growing" | "wall-growing"
  dynamicMultilocular: "stable" | "cyst-growing" | "newly-multilocular" | "increased-solid"
  suspicious: "spiculation" | "lymphadenopathy" | "metastasis" | "other"
  suspiciousOther: string
  incidentalFindings: string
}

export const LungRads2022Report = () => {
  const {
    timepoint,
    problematicExam,
    nodule,
    benignFeatures,
    structure,
    featuresSolid,
    longaxis,
    shortaxis,
    longaxisSolid,
    shortaxisSolid,
    dynamic,
    cyst,
    wall,
    formation,
    dynamicUnilocular,
    dynamicMultilocular,
    suspicious,
    suspiciousOther,
    incidentalFindings,
  } = useStructureData() as LungRads2022Data

  const { t } = useMicroTranslation(i18nReport)

  const { category } = defineLungRads2022(
    timepoint,
    problematicExam,
    nodule,
    benignFeatures,
    structure,
    featuresSolid,
    longaxis,
    shortaxis,
    longaxisSolid,
    shortaxisSolid,
    dynamic,
    cyst,
    wall,
    formation,
    dynamicUnilocular,
    dynamicMultilocular,
    suspicious
  )

  let conclusion = t(category)

  if (incidentalFindings) {
    conclusion = `${t(category)} S`
  }

  return (
    <Report>
      <Statement>
        <Paragraph>{conclusion}</Paragraph>
        <Paragraph hidden={suspicious?.length === 0}>
          Reason for X:
          {suspicious}
          {suspiciousOther}
        </Paragraph>
      </Statement>
      <Paragraph>{incidentalFindings}</Paragraph>
    </Report>
  )
}
