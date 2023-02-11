import { Loader, MultiSelect } from "@mantine/core"
import { ComponentProps, forwardRef, Ref } from "react"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { trpc } from "~/utils/trpc"

interface CategoriesSelectorProps<T extends string>
  extends Omit<ComponentProps<typeof MultiSelect>, "data"> {
  value: T[]
  onChange: (categories: T[]) => void
}

export const CategoriesSelector = forwardRef(
  <T extends string>(props: CategoriesSelectorProps<T>, ref: Ref<HTMLInputElement>) => {
    const { t, currentSiteLanguage } = useSiteTranslation()
    const { data, isLoading } = trpc.categories.getCategories.useQuery({
      language: currentSiteLanguage,
    })

    return (
      <MultiSelect
        {...props}
        ref={ref}
        label={t("CategoriesSelector.inputLabelCategories")}
        data={
          data?.categories.map((category) => ({
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
