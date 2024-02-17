import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { SelectPropertyInput } from "./SelectPropertyInput"

export const SingleChoiceVariantProperty = () => {
  const { t } = useSiteTranslation()
  return (
    <SelectPropertyInput
      name="variant"
      label={t("SingleChoiceVariantProperty.label")}
      data={[
        { label: t("SingleChoiceVariantProperty.selectLabel"), value: "select" },
        { label: t("SingleChoiceVariantProperty.radioLabel"), value: "radio" },
      ]}
    />
  )
}
