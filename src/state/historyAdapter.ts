import { Draft, PayloadAction } from "@reduxjs/toolkit"
import { applyPatches, castDraft, Patch, produce, produceWithPatches } from "immer"

type PatchesState = { undo: Patch[]; redo: Patch[] }

export interface HistoryState<T> {
  past: PatchesState[]
  present: T
  future: PatchesState[]
}

interface UndoableMeta {
  undoable?: boolean
}

export function createHistoryAdapter<T>() {
  return {
    getInitialState(initialState: T): HistoryState<T> {
      return {
        past: [],
        present: initialState,
        future: [],
      }
    },
    undo(state: Draft<HistoryState<T>>) {
      const historyEntry = state.past.pop()
      if (historyEntry) {
        applyPatches(state, historyEntry.undo)
        state.future.unshift(historyEntry)
      }
      return state
    },
    redo(state: Draft<HistoryState<T>>) {
      const historyEntry = state.future.shift()
      if (historyEntry) {
        applyPatches(state, historyEntry.redo)
        state.past.push(historyEntry)
      }
      return state
    },
    undoable<P>(mutator: (draft: Draft<T>, action: PayloadAction<P>) => void | T) {
      return {
        prepare(payload: P, options?: UndoableMeta) {
          return { payload, meta: options }
        },
        reducer(
          state: HistoryState<T>,
          action: PayloadAction<P, string, UndoableMeta | undefined>
        ) {
          const [nextState, redoPatch, undoPatch] = produceWithPatches(state, (draft) => {
            const result = mutator(draft.present, action)
            if (typeof result !== "undefined") {
              draft.present = castDraft(result as T)
            }
          })
          let finalState = nextState
          const undoable = action.meta?.undoable ?? true
          if (undoable) {
            finalState = produce(finalState, (draft) => {
              draft.past.push({
                undo: undoPatch,
                redo: redoPatch,
              })
              draft.future = []
            })
          }
          return finalState
        },
      }
    },
  }
}
