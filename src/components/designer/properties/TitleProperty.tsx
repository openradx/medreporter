import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { TextInputMetaProperty } from "./TextInputMetaProperty"

export const TitleProperty = () => {
  const { t } = useSiteTranslation()
  return <TextInputMetaProperty name="title" label={t("TitleProperty.label")} />
}
