import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { TextareaMetaProperty } from "./TextareaMetaProperty"

export const ContentProperty = () => {
  const { t } = useSiteTranslation()
  return <TextareaMetaProperty name="content" label={t("ContentProperty.label")} />
}
