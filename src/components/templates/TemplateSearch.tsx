import { CloseButton, TextInput } from "@mantine/core"
import { Search as FilterIcon } from "lucide-react"
import { useFilter } from "~/contexts/FilterContext"

export const TemplateSearch = () => {
  const filter = useFilter()

  return (
    <TextInput
      value={filter.search}
      onChange={(event) => filter.setSearch(event.target.value)}
      leftSection={<FilterIcon size={18} />}
      rightSection={<CloseButton size="sm" onClick={() => filter.setSearch("")} />}
    />
  )
}
