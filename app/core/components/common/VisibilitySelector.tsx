import { Select } from "@mantine/core"
import { Visibility } from "@prisma/client"
import { useSiteTranslation } from "app/core/hooks/useSiteTranslation"

export const VisibilitySelector = () => {
  const { t } = useSiteTranslation()

  return (
    <Select
      label={t("VisibilitySelector.inputLabelVisibility")}
      data={[
        { value: Visibility.PUBLIC, label: t("VisibilitySelector.optionPublic") },
        { value: Visibility.INSTITUTE, label: t("VisibilitySelector.optionInstitute") },
        { value: Visibility.PRIVATE, label: t("VisibilitySelector.optionPrivate") },
      ]}
    />
  )
}
