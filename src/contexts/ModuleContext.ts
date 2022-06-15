import { createRequiredContext } from "../utils/createRequiredContext"

interface ModuleContext {
  name: string
  id: string
  title: string
}

export const [useModule, ModuleContextProvider] =
  createRequiredContext<ModuleContext>("ModuleContext")
