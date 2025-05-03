import { useLingui as useLinguiLazy } from "@lingui/react"
import { useLingui as useLinguiMacro } from "@lingui/react/macro"
import { Loader, MultiSelect } from "@mantine/core"
import { useState } from "react"
import { useDebounce } from "use-debounce"
import { CATEGORIES } from "~/constants/lazy-translations"
import { useFilter } from "~/contexts/FilterContext"
import { getEmptyCategoryGroups, getGroupForCategory } from "~/utils/categoryUtils"
import { trpc } from "~/utils/trpc"

export const CategoriesFilter = () => {
  const { t } = useLinguiMacro()
  const { _ } = useLinguiLazy()
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
      label={t`Categories`}
      placeholder={t`Filter by categories`}
      searchValue={prefix}
      onSearchChange={(value) => setPrefix(value)}
      value={filter.categories}
      onChange={(value) => filter.setCategories(value)}
      data={Object.entries(groupsWithCategories).map(([group, categories]) => ({
        // @ts-expect-error group is a string by next.js
        group: _(CATEGORIES.group[group]),
        items: categories.map((category) => ({
          value: category,
          // @ts-expect-error category is a string by next.js
          label: _(CATEGORIES[category]),
        })),
      }))}
      searchable
      clearable
      rightSection={isPending ? <Loader size="xs" /> : null}
      error={error?.message}
    />
  )
}
