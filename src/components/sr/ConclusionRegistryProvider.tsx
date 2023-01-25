import { produce } from "immer"
import { ReactNode, useCallback, useMemo, useState } from "react"
import {
  ConclusionRegistryContext,
  ConclusionRegistryContextProvider,
} from "~/contexts/ConclusionRegistryContext"
import {
  AddConclusion,
  ConclusionRegistrySetterContextProvider,
  RemoveConclusion,
} from "~/contexts/ConclusionRegistrySettersContext"

const initialState: ConclusionRegistryContext = {
  critical: [],
  high: [],
  medium: [],
  low: [],
}

interface ConclusionRegistryProviderProps {
  children: ReactNode
}

export const ConclusionRegistryProvider = ({ children }: ConclusionRegistryProviderProps) => {
  const [conclusions, setConclusions] = useState<ConclusionRegistryContext>(initialState)

  const addConclusion: AddConclusion = useCallback((priority, content) => {
    setConclusions((state) =>
      produce(state, (draft) => {
        draft[priority].push(content)
      })
    )
  }, [])

  const removeConclusion: RemoveConclusion = useCallback((priority, content) => {
    setConclusions((state) =>
      produce(state, (draft) => {
        const index = draft[priority].indexOf(content)
        draft[priority] = draft[priority].splice(index, 1)
      })
    )
  }, [])

  const setters = useMemo(
    () => ({ addConclusion, removeConclusion }),
    [addConclusion, removeConclusion]
  )

  return (
    <ConclusionRegistryContextProvider value={conclusions}>
      <ConclusionRegistrySetterContextProvider value={setters}>
        {children}
      </ConclusionRegistrySetterContextProvider>
    </ConclusionRegistryContextProvider>
  )
}
