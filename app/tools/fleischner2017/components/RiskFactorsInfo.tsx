import { FieldInfo } from "app/core/components/structuredReport/FieldInfo"
import { useStructureTranslation } from "app/core/hooks/useStructureTranslation"

export const RiskFactorsInfo = () => {
  const { t } = useStructureTranslation()
  return (
    <FieldInfo title={t("Fleischner2017.fieldInfoRiskFactors.label")}>
      <ul>
        <li> {t("Fleischner2017.fieldInfoRiskFactors.1")} </li>
        <li> {t("Fleischner2017.fieldInfoRiskFactors.2")} </li>
        <li> {t("Fleischner2017.fieldInfoRiskFactors.3")} </li>
        <li> {t("Fleischner2017.fieldInfoRiskFactors.4")} </li>
        <li> {t("Fleischner2017.fieldInfoRiskFactors.5")} </li>
        <li> {t("Fleischner2017.fieldInfoRiskFactors.6")} </li>
        <li> {t("Fleischner2017.fieldInfoRiskFactors.7")} </li>
        <li> {t("Fleischner2017.fieldInfoRiskFactors.8")} </li>
        <li> {t("Fleischner2017.fieldInfoRiskFactors.9")} </li>
      </ul>
    </FieldInfo>
  )
}
