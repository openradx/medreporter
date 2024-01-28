import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { TextMetaProperty } from "./TextMetaProperty"

export const FreeTextDefaultProperty = () => {
  const { t } = useSiteTranslation()
  return <TextMetaProperty name="default" label={t("FreeTextDefaultProperty.label")} />
}
