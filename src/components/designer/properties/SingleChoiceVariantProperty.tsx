import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { SelectMetaProperty } from "./SelectMetaProperty"

export const SingleChoiceVariantProperty = () => {
  const { t } = useSiteTranslation()
  return (
    <SelectMetaProperty
      name="variant"
      label={t("SingleChoiceVariantProperty.label")}
      data={[
        { label: t("SingleChoiceVariantProperty.selectLabel"), value: "select" },
        { label: t("SingleChoiceVariantProperty.radioLabel"), value: "radio" },
      ]}
    />
  )
}
