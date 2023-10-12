import { Option } from "~/schemas/structure"
import { createRequiredContext } from "~/utils/createRequiredContext"

interface ChoiceFieldContext {
  options: Option[]
}

export const [useChoiceField, ChoiceFieldContextProvider] =
  createRequiredContext<ChoiceFieldContext>("ChoiceFieldContext")
