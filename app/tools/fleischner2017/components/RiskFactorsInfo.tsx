import { FieldInfo } from "../../../core/components/structuredReport/FieldInfo"
import { useStructureTranslation } from "../../../core/hooks/useStructureTranslation"

export const RiskFactorsInfo = () => {
  const { t } = useStructureTranslation()
  return (
    <FieldInfo title={t("riskFactorsInfo.label")}>
      <ul>
        <li> {t("riskFactorsInfo.1")} </li>
        <li> {t("riskFactorsInfo.2")} </li>
        <li> {t("riskFactorsInfo.3")} </li>
        <li> {t("riskFactorsInfo.4")} </li>
        <li> {t("riskFactorsInfo.5")} </li>
        <li> {t("riskFactorsInfo.6")} </li>
        <li> {t("riskFactorsInfo.7")} </li>
        <li> {t("riskFactorsInfo.8")} </li>
        <li> {t("riskFactorsInfo.9")} </li>
      </ul>
    </FieldInfo>
  )
}
