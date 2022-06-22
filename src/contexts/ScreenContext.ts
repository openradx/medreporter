import { createRequiredContext } from "../utils/createRequiredContext"

interface ScreenContext {
  screenSize: "sm" | "lg"
}

export const [useScreen, ScreenContextProvider] =
  createRequiredContext<ScreenContext>("ScreenContext")
