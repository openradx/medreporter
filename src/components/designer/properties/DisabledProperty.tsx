import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { ScriptMetaProperty } from "./ScriptMetaProperty"

export const DisabledProperty = () => {
  const { t } = useSiteTranslation()
  return (
    <ScriptMetaProperty
      name="disabled"
      label={t("DisabledProperty.label")}
      modalTitle={t("DisabledProperty.modalTitle")}
      modalDescription={t("DisabledProperty.modalDescription")}
    />
  )
}
