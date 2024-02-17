import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { BooleanPropertyInput } from "./BooleanPropertyInput"

export const WithSecondsProperty = () => {
  const { t } = useSiteTranslation()
  return <BooleanPropertyInput name="withSeconds" label={t("WithSecondsProperty.label")} />
}
