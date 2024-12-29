import { createRequiredContext } from "~/utils/createRequiredContext"

interface FilterContext {
  search: string
  setSearch: (filter: string) => void
  language: string
  setLanguage: (language: string) => void
}

export const [useFilter, FilterContextProvider] =
  createRequiredContext<FilterContext>("FilterContext")
