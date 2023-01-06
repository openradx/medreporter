import { createRequiredContext } from "~/utils/createRequiredContext"
import { Transformer } from "./TransformerRegistryContext"

export type { Transformer }
export type AddTransformer = (moduleId: string, transformer: Transformer) => void
export type RemoveTransformer = (moduleId: string, transformer: Transformer) => void

interface TransformerRegistrySettersContext {
  addTransformer: AddTransformer
  removeTransformer: RemoveTransformer
}

export const [useTransformerRegistrySetters, TransformerRegistrySetterContextProvider] =
  createRequiredContext<TransformerRegistrySettersContext>("TransformerRegistrySettersContext")
