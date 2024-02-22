import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { TextInputPropertyInput } from "./TextInputPropertyInput"

export const FreeTextDefaultProperty = () => {
  const { t } = useSiteTranslation()

  return <TextInputPropertyInput name="default" label={t("FreeTextDefaultProperty.label")} />
}
