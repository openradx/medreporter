import { ReactNode, useState } from "react"
import { FilterContextProvider } from "~/contexts/FilterContext"

interface FilterProviderProps {
  children: ReactNode
}

export const FilterProvider = ({ children }: FilterProviderProps) => {
  const [search, setSearch] = useState("")
  const [language, setLanguage] = useState("")

  return (
    <FilterContextProvider value={{ search, setSearch, language, setLanguage }}>
      {children}
    </FilterContextProvider>
  )
}
