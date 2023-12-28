import {
  CaseReducer,
  createSlice,
  Draft,
  original,
  PayloadAction,
  SliceCaseReducers,
  ValidateSliceCaseReducers,
} from "@reduxjs/toolkit"
import { applyPatches, castDraft, Patch, produce, produceWithPatches } from "immer"

type PatchesState = { undo: Patch[]; redo: Patch[] }

export type HistoryState<T> = {
  past: PatchesState[]
  present: T
  future: PatchesState[]
}

export const withHistory = <S, P>(reducerFn: CaseReducer<S, PayloadAction<P>>) => ({
  reducer(
    draftState: Draft<HistoryState<S>>,
    action: PayloadAction<P, string, { undoable?: boolean }>
  ) {
    const { undoable } = action.meta
    if (!undoable) {
      const result = reducerFn(draftState.present, action)
      if (result !== undefined) draftState.present = result as Draft<S>
      return undefined
    }

    const state = original(draftState) as HistoryState<S>
    const [nextState, redoPatch, undoPatch] = castDraft(
      produceWithPatches<HistoryState<S>, Draft<HistoryState<S>>>(state, (draft) => {
        const result = reducerFn(draft.present, action)
        if (result !== undefined) draft.present = result as Draft<S>
      })
    )

    return produce(nextState, (draft) => {
      draft.past.push({
        undo: undoPatch,
        redo: redoPatch,
      })
      draft.future = []
    })
  },
  prepare(payload: P, options?: { undoable: boolean }) {
    const undoable = options?.undoable ?? true
    return { payload, meta: { undoable } }
  },
})

export const createHistorySlice = <T, Reducers extends SliceCaseReducers<HistoryState<T>>>({
  name,
  initialState,
  reducers,
}: {
  name: string
  initialState: T
  reducers: ValidateSliceCaseReducers<HistoryState<T>, Reducers>
}) => {
  const historyInitialState: HistoryState<T> = {
    past: [],
    present: initialState,
    future: [],
  }

  return createSlice({
    name,
    initialState: historyInitialState,
    reducers: {
      undo(state) {
        const historyEntry = state.past.pop()
        if (historyEntry) {
          applyPatches(state, historyEntry.undo)
          state.future.unshift(historyEntry)
        }
      },
      redo(state) {
        const historyEntry = state.future.shift()
        if (historyEntry) {
          applyPatches(state, historyEntry.redo)
          state.past.push(historyEntry)
        }
      },
      ...reducers,
    },
  })
}
