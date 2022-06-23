import { createRequiredContext } from "../utils/createRequiredContext"

interface ScreenContext {
  screenSize: "sm" | "md" | "lg"
}

export const [useScreen, ScreenContextProvider] =
  createRequiredContext<ScreenContext>("ScreenContext")
