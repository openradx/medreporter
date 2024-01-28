import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { ScriptEditorMetaProperty } from "./ScriptEditorMetaProperty"

export const DisabledProperty = () => {
  const { t } = useSiteTranslation()
  return (
    <ScriptEditorMetaProperty
      name="disabled"
      label={t("DisabledProperty.label")}
      modalTitle={t("DisabledProperty.modalTitle")}
      modalDescription={t("DisabledProperty.modalDescription")}
    />
  )
}
