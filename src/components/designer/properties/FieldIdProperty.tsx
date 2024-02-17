import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { TextInputPropertyInput } from "./TextInputPropertyInput"

export const FieldIdProperty = () => {
  const { t } = useSiteTranslation()

  return <TextInputPropertyInput name="fieldId" label={t("FieldIdProperty.label")} />
}
