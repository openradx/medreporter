import { createRequiredContext } from "../utils/createRequiredContext"

interface ModuleContext {
  context: "structure" | "report"
  moduleId: string
  instanceId: string
}

export const [useModule, ModuleContextProvider] =
  createRequiredContext<ModuleContext>("ModuleContext")
