import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { TextInputPropertyInput } from "./TextInputPropertyInput"

export const TitleProperty = () => {
  const { t } = useSiteTranslation()

  return <TextInputPropertyInput name="title" label={t("TitleProperty.label")} />
}
