import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { BooleanPropertyInput } from "./BooleanPropertyInput"

export const FollowUpProperty = () => {
  const { t } = useSiteTranslation()

  return <BooleanPropertyInput name="followUp" label={t("FollowUpProperty.label")} />
}
