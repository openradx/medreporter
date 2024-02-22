import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { BooleanPropertyInput } from "./BooleanPropertyInput"

export const FindingDefaultProperty = () => {
  const { t } = useSiteTranslation()
  return <BooleanPropertyInput name="default" label={t("FindingDefaultProperty.label")} />
}
