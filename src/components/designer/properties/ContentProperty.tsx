import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { TextareaPropertyInput } from "./TextareaPropertyInput"

export const ContentProperty = () => {
  const { t } = useSiteTranslation()
  return <TextareaPropertyInput name="content" label={t("ContentProperty.label")} />
}
