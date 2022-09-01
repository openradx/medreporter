import { ActionIcon, TextInput } from "@mantine/core"
import { MdSearch as FilterIcon, MdClear as ClearIcon } from "react-icons/md"
import { useSiteTranslation } from "app/core/hooks/useSiteTranslation"
import { useFilter } from "../../contexts/FilterContext"

interface FilterInputProps {
  label: string
}

export const FilterInput = ({ label }: FilterInputProps) => {
  const { t } = useSiteTranslation()
  const { filter, setFilter } = useFilter()

  return (
    <TextInput
      label={label}
      id="filter-input"
      autoComplete="off"
      icon={<FilterIcon />}
      rightSection={
        <ActionIcon title={t("general.button_clear")} onClick={() => setFilter("")}>
          <ClearIcon />
        </ActionIcon>
      }
      value={filter}
      onChange={(event) => {
        setFilter(event.target.value)
      }}
    />
  )
}
