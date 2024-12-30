import { MultiSelect } from "@mantine/core"
import appConfig from "app.config"
import { useFilter } from "~/contexts/FilterContext"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"

export const CategoriesFilter = () => {
  const { t } = useSiteTranslation()
  const filter = useFilter()

  return (
    <MultiSelect
      label={t("CategoriesFilter.inputLabel")}
      value={filter.categories}
      onChange={(value) => filter.setCategories(value)}
      data={Object.entries(appConfig.availableCategories).map(([group, categories]) => ({
        group: t(`categories.group.${group}`),
        items: categories.map((category) => ({
          value: category,
          label: t(`categories.${category}`),
        })),
      }))}
      searchable
      clearable
    />
  )
}
