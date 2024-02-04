import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { ScriptMetaProperty } from "./ScriptMetaProperty"

export const HiddenProperty = () => {
  const { t } = useSiteTranslation()

  return (
    <ScriptMetaProperty
      name="hidden"
      label={t("HiddenProperty.label")}
      modalTitle={t("HiddenProperty.modalTitle")}
      modalDescription={t("HiddenProperty.modalDescription")}
    />
  )
}
