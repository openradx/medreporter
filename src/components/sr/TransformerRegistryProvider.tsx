import produce from "immer"
import { ReactNode, useCallback, useMemo, useState } from "react"
import {
  TransformerRegistryContext,
  TransformerRegistryContextProvider,
} from "../../contexts/TransformerRegistryContext"
import {
  AddTransformer,
  RemoveTransformer,
  TransformerRegistrySetterContextProvider,
} from "../../contexts/TransformerRegistrySettersContext"

interface TransformerRegistryProviderProps {
  children: ReactNode
}

export const TransformerRegistryProvider = ({ children }: TransformerRegistryProviderProps) => {
  const [transformers, setTransformers] = useState<TransformerRegistryContext>(new Map())

  const addTransformer: AddTransformer = useCallback((instanceId, transformer) => {
    setTransformers((state) =>
      produce(state, (draft) => {
        let moduleTransformers = draft.get(instanceId)
        if (!moduleTransformers) {
          moduleTransformers = []
          draft.set(instanceId, moduleTransformers)
        }
        if (moduleTransformers.includes(transformer)) {
          throw new Error(`Module with ID ${instanceId} already has transformer in registry.`)
        }
        moduleTransformers.push(transformer)
      })
    )
  }, [])

  const removeTransformer: RemoveTransformer = useCallback((instanceId, transformer) => {
    setTransformers((state) =>
      produce(state, (draft) => {
        const moduleTransformers = draft.get(instanceId)
        if (!moduleTransformers || !moduleTransformers.includes(transformer)) {
          throw new Error(`Module with ID ${instanceId} does not have transformer in registry.`)
        }
        const index = moduleTransformers.indexOf(transformer)
        moduleTransformers.splice(index, 1)
      })
    )
  }, [])

  const registrySetters = useMemo(
    () => ({ addTransformer, removeTransformer }),
    [addTransformer, removeTransformer]
  )

  return (
    <TransformerRegistryContextProvider value={transformers}>
      <TransformerRegistrySetterContextProvider value={registrySetters}>
        {children}
      </TransformerRegistrySetterContextProvider>
    </TransformerRegistryContextProvider>
  )
}
