import { ActionIcon } from "@mantine/core"
import { Eraser as ClearAllIcon } from "lucide-react"
import { useFilter } from "~/contexts/FilterContext"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"

export const ClearFiltersButton = () => {
  const { t } = useSiteTranslation()
  const filter = useFilter()

  return (
    <ActionIcon
      title={t("ClearFiltersButton.title")}
      variant="default"
      onClick={() => {
        filter.setCategories([])
        filter.setLanguage("")
        filter.setUsername("")
      }}
      aria-label="Clear filters"
    >
      <ClearAllIcon size={20} />
    </ActionIcon>
  )
}
