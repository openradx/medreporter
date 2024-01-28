import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { TextInputMetaProperty } from "./TextInputMetaProperty"

export const FieldIdProperty = () => {
  const { t } = useSiteTranslation()

  return <TextInputMetaProperty name="fieldId" label={t("FieldIdProperty.label")} />
}
