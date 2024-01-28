import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { TextMetaProperty } from "./TextMetaProperty"

export const FormatProperty = () => {
  const { t } = useSiteTranslation()
  return <TextMetaProperty name="format" label={t("FormatProperty.label")} />
}
