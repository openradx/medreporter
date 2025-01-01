import { createRequiredContext } from "~/utils/createRequiredContext"

interface FilterContext {
  categories: string[]
  setCategories: (categories: string[]) => void
  language: string
  setLanguage: (language: string) => void
  search: string
  setSearch: (filter: string) => void
  username: string
  setUsername: (user: string) => void
}

export const [useFilter, FilterContextProvider] =
  createRequiredContext<FilterContext>("FilterContext")
