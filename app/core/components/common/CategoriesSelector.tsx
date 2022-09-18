import { useQuery } from "@blitzjs/rpc"
import { Loader, MultiSelect } from "@mantine/core"
import { useSiteTranslation } from "app/core/hooks/useSiteTranslation"
import getCategories from "app/core/queries/getCategories"

interface CategoriesSelectorProps {
  value: string[]
  onChange: (categories: string[]) => void
}

export const CategoriesSelector = ({ value, onChange }: CategoriesSelectorProps) => {
  const { t, currentSiteLanguage } = useSiteTranslation()
  const [result, { isLoading }] = useQuery(
    getCategories,
    { language: currentSiteLanguage },
    { suspense: false }
  )

  return (
    <MultiSelect
      label={t("CategoriesSelector.inputLabelCategories")}
      value={value}
      onChange={onChange}
      data={
        result?.categories.map((category) => ({
          value: category.key,
          label: category.label,
        })) ?? []
      }
      rightSection={isLoading && <Loader size="xs" />}
      searchable
    />
  )
}
