import { StructureDataState } from "~/state/structureDataSlice"
import { createRequiredContext } from "~/utils/createRequiredContext"

export type Transformer = (data: StructureDataState) => void
export type TransformerRegistryContext = Map<string, Transformer[]>

export const [useTransformerRegistry, TransformerRegistryContextProvider] =
  createRequiredContext<TransformerRegistryContext>("TransformerRegistryContext")
