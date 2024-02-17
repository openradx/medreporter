import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { ScriptPropertyInput } from "./ScriptPropertyInput"

export const HiddenProperty = () => {
  const { t } = useSiteTranslation()

  return (
    <ScriptPropertyInput
      name="hidden"
      label={t("HiddenProperty.label")}
      modalTitle={t("HiddenProperty.modalTitle")}
      modalDescription={t("HiddenProperty.modalDescription")}
    />
  )
}
