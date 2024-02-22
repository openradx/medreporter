import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { SelectPropertyInput } from "./SelectPropertyInput"

export const MultipleChoiceVariantProperty = () => {
  const { t } = useSiteTranslation()

  return (
    <SelectPropertyInput
      name="variant"
      label={t("MultipleChoiceVariantProperty.label")}
      data={[
        { label: t("MultipleChoiceVariantProperty.selectLabel"), value: "select" },
        { label: t("MultipleChoiceVariantProperty.checkboxLabel"), value: "checkbox" },
      ]}
    />
  )
}
