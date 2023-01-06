import { useEffect } from "react"
import { useModule } from "~/contexts/ModuleContext"
import {
  useTransformerRegistrySetters,
  Transformer,
} from "~/contexts/TransformerRegistrySettersContext"

export const useTransformer = (transformer?: Transformer) => {
  const { id: moduleId } = useModule()
  const { addTransformer, removeTransformer } = useTransformerRegistrySetters()

  useEffect(() => {
    if (transformer) {
      addTransformer(moduleId, transformer)
      return () => {
        removeTransformer(moduleId, transformer)
      }
    }
    return () => {}
  }, [transformer, moduleId, addTransformer, removeTransformer])
}
