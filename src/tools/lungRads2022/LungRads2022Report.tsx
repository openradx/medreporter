import { Paragraph } from "~/components/template/Paragraph"
import { Report } from "~/components/template/Report"
import { Statement } from "~/components/template/Statement"
import { useMicroTranslation } from "~/hooks/useMicroTranslation"
import { useStructureData } from "~/hooks/useStructureData"
import { i18nReport } from "./locales"
import { defineLungRads2022, giveLungRads2022Recommendation } from "./lungRads2022Utils"

export type LungRads2022Data = {
  problematicExam: "prior-CT-not-available" | "not-evaluable" | "infectious" | "none"
  timepoint: "baseline" | "follow-up"
  previous: "0" | "1" | "2" | "3" | "4A" | "4B" | "4X"
  nodule: boolean
  benignFeatures: "calcification" | "fat" | "none"
  structure: "solid" | "groundglass" | "partsolid"
  featuresSolid: "smooth-margins" | "subsegmental-airway" | "segmental-airway" | "none"
  longaxis: number | null
  shortaxis: number | null
  longaxisSolid: number | null
  shortaxisSolid: number | null
  dynamic: "new" | "stable" | "slowly-growing" | "growing" | "decreasing"
  timeOfDynamicNodule: number
  cyst: boolean
  wall: "thin" | "thick"
  formation: "unilocular" | "multilocular"
  dynamicUnilocular: "stable" | "cyst-growing" | "wall-growing"
  dynamicMultilocular: "stable" | "cyst-growing" | "newly-multilocular" | "increased-solid"
  timeOfDynamicCyst: number
  suspicious: "spiculation" | "lymphadenopathy" | "metastasis" | "other"
  suspiciousOther: string
  incidentalFindings: string
}

export const LungRads2022Report = () => {
  const {
    problematicExam,
    timepoint,
    previous,
    nodule,
    benignFeatures,
    structure,
    featuresSolid,
    longaxis,
    shortaxis,
    longaxisSolid,
    shortaxisSolid,
    dynamic,
    timeOfDynamicNodule,
    cyst,
    wall,
    formation,
    dynamicUnilocular,
    dynamicMultilocular,
    timeOfDynamicCyst,
    suspicious,
    suspiciousOther,
    incidentalFindings,
  } = useStructureData() as LungRads2022Data

  const { t } = useMicroTranslation(i18nReport)

  const { category } = defineLungRads2022(
    problematicExam,
    timepoint,
    previous,
    nodule,
    benignFeatures,
    structure,
    featuresSolid,
    longaxis,
    shortaxis,
    longaxisSolid,
    shortaxisSolid,
    dynamic,
    timeOfDynamicNodule,
    cyst,
    wall,
    formation,
    dynamicUnilocular,
    dynamicMultilocular,
    timeOfDynamicCyst,
    suspicious
  )

  let conclusion = t(category)

  if (incidentalFindings) {
    conclusion = `${t(category)} S`
  }

  const { recommendation } = giveLungRads2022Recommendation(
    category,
    problematicExam,
    featuresSolid
  )

  return (
    <Report>
      <Statement>
        {t("LungRads2022.category")}: {conclusion}
      </Statement>
      <Paragraph hidden={suspicious?.length === 0}>
        <Statement>
          {t("LungRads2022.reasonForX")}: {suspicious}, {suspiciousOther}
        </Statement>
      </Paragraph>
      <Statement>
        {t("LungRads2022.recommendation")}: {t(recommendation)}
      </Statement>
      <Paragraph hidden={!incidentalFindings}>
        <Statement>
          {t("LungRads2022.incidentalFindings")}: {incidentalFindings}
        </Statement>
        <Paragraph>{t("LungRads2022.SpecificFinding")}</Paragraph>
      </Paragraph>
    </Report>
  )
}
