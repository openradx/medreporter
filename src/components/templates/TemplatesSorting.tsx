import { useLingui } from "@lingui/react/macro"
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

export const TemplatesSorting = () => {
  const { t } = useLingui()
  const filter = useFilter()

  return (
    <Select
      data={[
        { value: CREATED_DESC, label: t`Newest first` },
        { value: CREATED_ASC, label: t`Oldest first` },
        {
          value: TITLE_ASC,
          label: t`Title(A-Z)`,
        },
        {
          value: TITLE_DESC,
          label: t`Title (Z-A)`,
        },
        {
          value: AUTHOR_ASC,
          label: t`Author (A-Z)`,
        },
        {
          value: AUTHOR_DESC,
          label: t`Author (Z-A)`,
        },
      ]}
      value={filter.sorting}
      onChange={(value) => filter.setSorting(value ?? "")}
      label={t`Sort by...`}
      placeholder={t`Choose sorting strategy`}
      clearable
      searchable
      allowDeselect
    />
  )
}
