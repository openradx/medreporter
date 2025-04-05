import { createContext, useContext } from "react"

export function createRequiredContext<T extends object | null>(contextName: string) {
  const requiredContext = createContext<T | undefined>(undefined)

  function useRequiredContext() {
    const contextValue = useContext(requiredContext)

    if (contextValue === undefined) {
      throw new Error(`${contextName} must be used inside a Provider with a value.`)
    }
    return contextValue
  }

  return [useRequiredContext, requiredContext.Provider] as const
}
