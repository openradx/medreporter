import { Select } from "@mantine/core"
import { Visibility } from "@prisma/client"
import { useSiteTranslation } from "app/core/hooks/useSiteTranslation"

interface VisibilitySelectorProps {
  value: Visibility
  onChange: (visibility: Visibility) => void
}

export const VisibilitySelector = ({ value, onChange }: VisibilitySelectorProps) => {
  const { t } = useSiteTranslation()

  return (
    <Select
      label={t("VisibilitySelector.inputLabelVisibility")}
      value={value}
      onChange={onChange}
      data={[
        { value: Visibility.PUBLIC, label: t("VisibilitySelector.optionPublic") },
        { value: Visibility.INSTITUTE, label: t("VisibilitySelector.optionInstitute") },
        { value: Visibility.PRIVATE, label: t("VisibilitySelector.optionPrivate") },
      ]}
      withAsterisk
    />
  )
}
