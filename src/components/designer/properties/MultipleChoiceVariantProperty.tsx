import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { SelectMetaProperty } from "./SelectMetaProperty"

export const MultipleChoiceVariantProperty = () => {
  const { t } = useSiteTranslation()
  return (
    <SelectMetaProperty
      name="variant"
      label={t("MultipleChoiceVariantProperty.label")}
      data={[
        { label: t("MultipleChoiceVariantProperty.selectLabel"), value: "select" },
        { label: t("MultipleChoiceVariantProperty.checkboxLabel"), value: "checkbox" },
      ]}
    />
  )
}
