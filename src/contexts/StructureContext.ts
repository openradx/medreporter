import { MutableRefObject } from "react"
import { StructureData } from "~/schemas/structure"
import { createRequiredContext } from "~/utils/createRequiredContext"

interface StructureContext {
  defaultValuesRef: MutableRefObject<StructureData>
}

export const [useStructure, StructureContextProvider] =
  createRequiredContext<StructureContext>("StructureContext")
