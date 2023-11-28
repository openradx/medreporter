import { createRequiredContext } from "~/utils/createRequiredContext"

interface ContainerContext {
  direction: "row" | "column"
}

export const [useContainer, ContainerContextProvider] =
  createRequiredContext<ContainerContext>("ContainerContext")
