import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { TextInputMetaProperty } from "./TextInputMetaProperty"

export const LinkProperty = () => {
  const { t } = useSiteTranslation()
  return <TextInputMetaProperty name="link" label={t("LinkProperty.label")} />
}
