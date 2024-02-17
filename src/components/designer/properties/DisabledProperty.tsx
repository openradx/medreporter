import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { ScriptPropertyInput } from "./ScriptPropertyInput"

export const DisabledProperty = () => {
  const { t } = useSiteTranslation()
  return (
    <ScriptPropertyInput
      name="disabled"
      label={t("DisabledProperty.label")}
      modalTitle={t("DisabledProperty.modalTitle")}
      modalDescription={t("DisabledProperty.modalDescription")}
    />
  )
}
