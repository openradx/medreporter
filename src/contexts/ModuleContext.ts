import { createRequiredContext } from "../utils/createRequiredContext"

interface ModuleContext {
  id: string
  name?: string
}

export const [useModule, ModuleContextProvider] =
  createRequiredContext<ModuleContext>("ModuleContext")
