import { CloseButton, TextInput } from "@mantine/core"
import { Search as FilterIcon } from "lucide-react"
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
      leftSection={<FilterIcon size={18} />}
      rightSection={<CloseButton size="sm" onClick={() => setFilter("")} />}
      value={filter}
      onChange={(event) => {
        setFilter(event.target.value)
      }}
    />
  )
}
