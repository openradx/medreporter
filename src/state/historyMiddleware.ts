import { PayloadAction, Middleware } from "@reduxjs/toolkit"
import { forwardTracker } from "./historyTrackerSlice"
import type { RootState } from "./store"

export const historyMiddleware: Middleware<{}, RootState> =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    const { meta } = action as PayloadAction<
      any,
      any,
      { undoable?: boolean; historyCurrent?: number } | undefined
    >

    if (!meta?.undoable) {
      return next(action)
    }

    dispatch(forwardTracker())
    const state = getState()
    meta.historyCurrent = state.historyTracker.current
    return next(action)
  }
