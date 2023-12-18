import { createRequiredContext } from "~/utils/createRequiredContext"

interface ContainerContext {
  direction: "row" | "column"
  justify: "start" | "center" | "end" | "space-between" | "space-around"
}

export const [useContainer, ContainerContextProvider] =
  createRequiredContext<ContainerContext>("ContainerContext")
