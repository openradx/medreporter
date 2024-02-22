import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { TextInputPropertyInput } from "./TextInputPropertyInput"

export const FormatProperty = () => {
  const { t } = useSiteTranslation()

  return <TextInputPropertyInput name="format" label={t("FormatProperty.label")} />
}
