import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { BooleanPropertyInput } from "./BooleanPropertyInput"

export const ListProperty = () => {
  const { t } = useSiteTranslation()

  return <BooleanPropertyInput name="list" label={t("ListProperty.label")} />
}
