import { createRequiredContext } from "../utils/createRequiredContext"

interface ModuleContext {
  context: "structure" | "report"
  moduleName: string
  moduleId: string
}

export const [useModule, ModuleContextProvider] =
  createRequiredContext<ModuleContext>("ModuleContext")
