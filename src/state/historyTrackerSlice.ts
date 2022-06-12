import { createAction, createSlice } from "@reduxjs/toolkit"
import { AppThunk, RootState } from "RootTypes"

const initialState = {
  current: 0,
  mostRecent: 0,
}

export const undoHistory = createAction<number>("undoHistory")
export const redoHistory = createAction<number>("redoHistory")

export const historyTrackerSlice = createSlice({
  name: "historyTracker",
  initialState,
  reducers: {
    forwardTracker(state) {
      state.current += 1
      state.mostRecent = state.current
    },
    undoTracker(state) {
      state.current -= 1
    },
    redoTracker(state) {
      state.current += 1
    },
  },
})

export const { forwardTracker, undoTracker, redoTracker } = historyTrackerSlice.actions

export const undo = (): AppThunk<RootState | void> => (dispatch, getState) => {
  const current = getState().historyTracker.current
  if (current > 0) {
    dispatch(undoHistory(current))
    dispatch(undoTracker())
    return getState()
  }
}

export const redo = (): AppThunk<RootState | void> => (dispatch, getState) => {
  const tracker = getState().historyTracker
  if (tracker.current < tracker.mostRecent) {
    dispatch(redoTracker())
    const current = getState().historyTracker.current
    dispatch(redoHistory(current))
    return getState()
  }
}

export default historyTrackerSlice.reducer

export const selectCanUndo = (state: RootState) => {
  return state.historyTracker.current > 0
}

export const selectCanRedo = (state: RootState) => {
  return state.historyTracker.current < state.historyTracker.mostRecent
}
