import { useQuery } from "@blitzjs/rpc"
import { Loader, MultiSelect } from "@mantine/core"
import { ComponentProps, forwardRef, Ref } from "react"
import { useSiteTranslation } from "app/core/hooks/useSiteTranslation"
import getCategories from "app/core/queries/getCategories"

interface CategoriesSelectorProps<T extends string>
  extends Omit<ComponentProps<typeof MultiSelect>, "data"> {
  value: T[]
  onChange: (categories: T[]) => void
}

export const CategoriesSelector = forwardRef(
  <T extends string>(props: CategoriesSelectorProps<T>, ref: Ref<HTMLInputElement>) => {
    const { t, currentSiteLanguage } = useSiteTranslation()
    const [result, { isLoading }] = useQuery(
      getCategories,
      { language: currentSiteLanguage },
      { suspense: false }
    )

    return (
      <MultiSelect
        {...props}
        ref={ref}
        label={t("CategoriesSelector.inputLabelCategories")}
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
)
