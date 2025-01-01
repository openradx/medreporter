import { ReactNode, useState } from "react"
import { FilterContextProvider } from "~/contexts/FilterContext"

interface FilterProviderProps {
  children: ReactNode
}

export const FilterProvider = ({ children }: FilterProviderProps) => {
  const [categories, setCategories] = useState<string[]>([])
  const [language, setLanguage] = useState("")
  const [search, setSearch] = useState("")
  const [username, setUsername] = useState("")

  return (
    <FilterContextProvider
      value={{
        categories,
        setCategories,
        language,
        setLanguage,
        search,
        setSearch,
        username,
        setUsername,
      }}
    >
      {children}
    </FilterContextProvider>
  )
}
