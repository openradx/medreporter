import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { TextMetaProperty } from "./TextMetaProperty"

export const LinkProperty = () => {
  const { t } = useSiteTranslation()
  return <TextMetaProperty name="link" label={t("LinkProperty.label")} />
}
