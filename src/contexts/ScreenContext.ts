import { createRequiredContext } from "../utils/createRequiredContext"

interface ScreenContext {
  screenSize: "small" | "medium" | "large"
}

export const [useScreen, ScreenContextProvider] =
  createRequiredContext<ScreenContext>("ScreenContext")
