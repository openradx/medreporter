import { createRequiredContext } from "../utils/createRequiredContext"
import { Transformer } from "./TransformerRegistryContext"

export type { Transformer }
export type AddTransformer = (instanceId: string, transformer: Transformer) => void
export type RemoveTransformer = (instanceId: string, transformer: Transformer) => void

interface TransformerRegistrySettersContext {
  addTransformer: AddTransformer
  removeTransformer: RemoveTransformer
}

export const [useTransformerRegistrySetters, TransformerRegistrySetterContextProvider] =
  createRequiredContext<TransformerRegistrySettersContext>("TransformerRegistrySettersContext")
