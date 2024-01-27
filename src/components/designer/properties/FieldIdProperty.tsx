import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { TextMetaProperty } from "./TextMetaProperty"

export const FieldIdProperty = () => {
  const { t } = useSiteTranslation()

  return <TextMetaProperty label={t("FieldIdProperty.label")} name="id" />
}
