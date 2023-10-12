import { createContext, useContext } from "react"

export function createOptionalContext<T extends {} | null>(contextName: string) {
  const optionalContext = createContext<T | undefined>(undefined)

  function useOptionalContext() {
    const contextValue = useContext(optionalContext)

    if (contextValue === undefined) {
      // TODO: only output in dev mode
      // eslint-disable-next-line no-console
      console.debug(`Optional ${contextName} called without Provider.`)
    }
    return contextValue
  }

  return [useOptionalContext, optionalContext.Provider] as const
}
