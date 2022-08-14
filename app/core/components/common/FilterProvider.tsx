import { ReactNode, useState } from "react"
import { FilterContextProvider } from "../../contexts/FilterContext"

interface FilterProviderProps {
  children: ReactNode
}

export const FilterProvider = ({ children }: FilterProviderProps) => {
  const [filter, setFilter] = useState("")

  return <FilterContextProvider value={{ filter, setFilter }}>{children}</FilterContextProvider>
}
