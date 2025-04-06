import { RefObject } from "react"
import { StructureData } from "~/schemas/structure"
import { createRequiredContext } from "~/utils/createRequiredContext"

interface StructureContext {
  defaultValuesRef: RefObject<StructureData>
}

export const [useStructure, StructureContextProvider] =
  createRequiredContext<StructureContext>("StructureContext")
