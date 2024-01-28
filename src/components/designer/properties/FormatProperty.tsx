import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { TextInputMetaProperty } from "./TextInputMetaProperty"

export const FormatProperty = () => {
  const { t } = useSiteTranslation()
  return <TextInputMetaProperty name="format" label={t("FormatProperty.label")} />
}
