import { CloseButton, TextInput } from "@mantine/core"
import { MdSearch as FilterIcon } from "react-icons/md"
import { useFilter } from "~/contexts/FilterContext"

interface FilterInputProps {
  label: string
}

export const FilterInput = ({ label }: FilterInputProps) => {
  const { filter, setFilter } = useFilter()

  return (
    <TextInput
      label={label}
      id="filter-input"
      autoComplete="off"
      leftSection={<FilterIcon />}
      rightSection={<CloseButton size="sm" onClick={() => setFilter("")} />}
      value={filter}
      onChange={(event) => {
        setFilter(event.target.value)
      }}
    />
  )
}
