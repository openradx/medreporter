import { Loader, MultiSelect } from "@mantine/core"
import { useState } from "react"
import { useDebounce } from "use-debounce"
import { useFilter } from "~/contexts/FilterContext"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { getEmptyCategoryGroups, getGroupForCategory } from "~/utils/categoryUtils"
import { trpc } from "~/utils/trpc"

export const CategoriesFilter = () => {
  const { t } = useSiteTranslation()
  const filter = useFilter()
  const [prefix, setPrefix] = useState("")
  const [prefixDebounced] = useDebounce(prefix, 500)
  const { data, error, isPending } = trpc.categories.getCategories.useQuery({
    language: filter.language,
    prefix: prefixDebounced,
  })

  const groupsWithCategories = getEmptyCategoryGroups()
  data?.categories.forEach((category) => {
    const group = getGroupForCategory(category.key)
    groupsWithCategories[group].push(category.key)
  })

  return (
    <MultiSelect
      label={t("CategoriesFilter.inputLabel")}
      placeholder={t("CategoriesFilter.inputPlaceholder")}
      searchValue={prefix}
      onSearchChange={(value) => setPrefix(value)}
      value={filter.categories}
      onChange={(value) => filter.setCategories(value)}
      data={Object.entries(groupsWithCategories).map(([group, categories]) => ({
        group: t(`categories.group.${group}`),
        items: categories.map((category) => ({
          value: category,
          label: t(`categories.${category}`),
        })),
      }))}
      searchable
      clearable
      rightSection={isPending ? <Loader size="xs" /> : null}
      error={error?.message}
    />
  )
}
