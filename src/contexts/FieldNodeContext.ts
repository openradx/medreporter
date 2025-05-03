import { DiscreteFieldNode } from "~/schemas/structure"
import { createOptionalContext } from "~/utils/createOptionalContext"

interface FieldNodeContext {
  node: DiscreteFieldNode
}

export const [useFieldNode, FieldNodeContextProvider] =
  createOptionalContext<FieldNodeContext>("FieldNodeContext")
