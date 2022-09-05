import { FieldInfo } from "../../../core/components/structuredReport/FieldInfo"
import { useStructureTranslation } from "../../../core/hooks/useStructureTranslation"

export const RiskFactorsInfo = () => {
  const { t } = useStructureTranslation()
  return (
    <FieldInfo title={t("fieldInfoRiskFactors.label")}>
      <ul>
        <li> {t("fieldInfoRiskFactors.1")} </li>
        <li> {t("fieldInfoRiskFactors.2")} </li>
        <li> {t("fieldInfoRiskFactors.3")} </li>
        <li> {t("fieldInfoRiskFactors.4")} </li>
        <li> {t("fieldInfoRiskFactors.5")} </li>
        <li> {t("fieldInfoRiskFactors.6")} </li>
        <li> {t("fieldInfoRiskFactors.7")} </li>
        <li> {t("fieldInfoRiskFactors.8")} </li>
        <li> {t("fieldInfoRiskFactors.9")} </li>
      </ul>
    </FieldInfo>
  )
}
