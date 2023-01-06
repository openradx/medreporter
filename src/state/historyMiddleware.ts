import { PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "RootTypes"
import { Middleware } from "redux"
import { forwardTracker } from "./historyTrackerSlice"

export const historyMiddleware: Middleware<{}, RootState> =
  ({ dispatch, getState }) =>
  (next) =>
  (action: PayloadAction<any, any, { undoable?: boolean; historyCurrent?: number }>) => {
    if (!action.meta?.undoable) {
      return next(action)
    }

    dispatch(forwardTracker())
    action.meta.historyCurrent = getState().historyTracker.current
    return next(action)
  }
