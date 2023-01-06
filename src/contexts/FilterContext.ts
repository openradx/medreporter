import { createRequiredContext } from "~/utils/createRequiredContext"

interface FilterContext {
  filter: string
  setFilter: (filter: string) => void
}

export const [useFilter, FilterContextProvider] =
  createRequiredContext<FilterContext>("FilterContext")
