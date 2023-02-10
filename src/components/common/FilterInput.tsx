import { ActionIcon, TextInput } from "@mantine/core"
import { MdSearch as FilterIcon, MdClear as ClearIcon } from "react-icons/md"
import { useFilter } from "~/contexts/FilterContext"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"

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
        <ActionIcon title={t("general.buttonClear")} onClick={() => setFilter("")}>
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