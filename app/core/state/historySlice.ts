import {
  CaseReducer,
  createSlice,
  Draft,
  original,
  PayloadAction,
  SliceCaseReducers,
  ValidateSliceCaseReducers,
} from "@reduxjs/toolkit"
import produce, { applyPatches, castDraft, Patch, produceWithPatches } from "immer"
import { redoHistory, undoHistory } from "./historyTrackerSlice"

type PatchesState = { [historyCurrent: number]: { undo: Patch[]; redo: Patch[] } }

export type HistoryState<T> = {
  past: PatchesState
  present: T
  future: PatchesState
}

export const withHistory = <S, P>(reducerFn: CaseReducer<S, PayloadAction<P>>) => ({
  reducer(
    draftState: Draft<HistoryState<S>>,
    action: PayloadAction<P, string, { undoable?: boolean; historyCurrent?: number }>
  ) {
    const { historyCurrent } = action.meta
    if (historyCurrent == null) {
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
      draft.past[historyCurrent] = {
        undo: undoPatch,
        redo: redoPatch,
      }
      draft.future = {}
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
  const historyInitialState = {
    past: {},
    present: initialState,
    future: {},
  }

  return createSlice({
    name,
    initialState: historyInitialState,
    reducers: { ...reducers },
    extraReducers: (builder) => {
      builder
        .addCase(undoHistory, <V>(state: Draft<HistoryState<V>>, action: PayloadAction<number>) => {
          const historyCurrent = action.payload
          const historyEntry = state.past[historyCurrent]
          if (historyEntry) {
            applyPatches(state, historyEntry.undo)
            state.future[historyCurrent] = historyEntry
            delete state.past[historyCurrent]
          }
        })
        .addCase(redoHistory, <V>(state: Draft<HistoryState<V>>, action: PayloadAction<number>) => {
          const historyCurrent = action.payload
          const historyEntry = state.future[historyCurrent]
          if (historyEntry) {
            applyPatches(state, historyEntry.redo)
            state.past[historyCurrent] = historyEntry
            delete state.future[historyCurrent]
          }
        })
    },
  })
}
