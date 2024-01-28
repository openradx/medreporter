import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { TextInputMetaProperty } from "./TextInputMetaProperty"

export const FreeTextDefaultProperty = () => {
  const { t } = useSiteTranslation()
  return <TextInputMetaProperty name="default" label={t("FreeTextDefaultProperty.label")} />
}
