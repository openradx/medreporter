import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { BooleanPropertyInput } from "./BooleanPropertyInput"

export const BorderProperty = () => {
  const { t } = useSiteTranslation()
  return <BooleanPropertyInput name="border" label={t("BorderProperty.label")} />
}
