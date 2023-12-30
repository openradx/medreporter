import { createSlice } from "@reduxjs/toolkit"
import { z } from "zod"
import { createHistoryAdapter } from "./historyAdapter"
import type { AppThunk, RootState } from "./store"

export const structureDataSchema = z.record(z.any()) // {fieldId: value}

export type StructureDataState = z.infer<typeof structureDataSchema>

const structureDataHistoryAdapter = createHistoryAdapter<StructureDataState>()

const initialState = structureDataHistoryAdapter.getInitialState({})

export const structureDataSlice = createSlice({
  name: "structureData",
  initialState,
  reducers: {
    resetStructureData() {
      return {
        past: [],
        present: initialState,
        future: [],
      }
    },
    undo: structureDataHistoryAdapter.undo,
    redo: structureDataHistoryAdapter.redo,
    setStructureData: structureDataHistoryAdapter.undoable<StructureDataState>(
      (_, action) => action.payload
    ),
    changeStructureValue: structureDataHistoryAdapter.undoable<{ fieldId: string; value: any }>(
      (state, action) => {
        const { fieldId, value } = action.payload
        state[fieldId] = value
      }
    ),
  },
})

export const { undo, redo, resetStructureData, setStructureData, changeStructureValue } =
  structureDataSlice.actions

export default structureDataSlice.reducer

export const selectStructureData = (state: RootState) => state.structureData.present
export const selectCanUndo = (state: RootState) => state.structureData.past.length > 0
export const selectCanRedo = (state: RootState) => state.structureData.future.length > 0

export const undoAndSelect = (): AppThunk<StructureDataState> => (dispatch, getState) => {
  const state = getState()
  const canUndo = selectCanUndo(state)
  if (canUndo) {
    dispatch(undo())
  }
  return selectStructureData(getState())
}

export const redoAndSelect = (): AppThunk<StructureDataState> => (dispatch, getState) => {
  const state = getState()
  const canRedo = selectCanRedo(state)
  if (canRedo) {
    dispatch(redo())
  }
  return selectStructureData(getState())
}
