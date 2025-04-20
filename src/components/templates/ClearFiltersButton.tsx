import { useLingui } from "@lingui/react/macro"
import { ActionIcon } from "@mantine/core"
import { Eraser as ClearAllIcon } from "lucide-react"
import { useFilter } from "~/contexts/FilterContext"

export const ClearFiltersButton = () => {
  const { t } = useLingui()
  const filter = useFilter()

  return (
    <ActionIcon
      title={t`Clear filters`}
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
