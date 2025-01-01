import { Select } from "@mantine/core"
import {
  AUTHOR_ASC,
  AUTHOR_DESC,
  CREATED_ASC,
  CREATED_DESC,
  TITLE_ASC,
  TITLE_DESC,
} from "~/constants/sorting-options"
import { useFilter } from "~/contexts/FilterContext"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"

export const TemplatesSorting = () => {
  const { t } = useSiteTranslation()
  const filter = useFilter()

  return (
    <Select
      data={[
        { value: CREATED_DESC, label: t("TemplatesSorting.optionCreatedDesc") },
        { value: CREATED_ASC, label: t("TemplatesSorting.optionCreatedAsc") },
        {
          value: TITLE_ASC,
          label: t("TemplatesSorting.optionTitleAsc"),
        },
        {
          value: TITLE_DESC,
          label: t("TemplatesSorting.optionTitleDesc"),
        },
        {
          value: AUTHOR_ASC,
          label: t("TemplatesSorting.optionAuthorAsc"),
        },
        {
          value: AUTHOR_DESC,
          label: t("TemplatesSorting.optionAuthorDesc"),
        },
      ]}
      value={filter.sorting}
      onChange={(value) => filter.setSorting(value ?? "")}
      label={t("TemplatesSorting.inputLabel")}
      placeholder={t("TemplatesSorting.inputPlaceholder")}
      clearable
      searchable
      allowDeselect
    />
  )
}
