import { createSlice } from "@reduxjs/toolkit"
import { StructureData } from "~/schemas/structure"
import { createHistoryAdapter } from "./historyAdapter"
import type { RootState } from "./store"

export type StructureHistoryDataState = StructureData

const structureDataHistoryAdapter = createHistoryAdapter<StructureHistoryDataState>()

const initialState = structureDataHistoryAdapter.getInitialState({})

export const structureHistoryDataSlice = createSlice({
  name: "structureHistoryData",
  initialState,
  reducers: {
    undoHistoryData: structureDataHistoryAdapter.undo,
    redoHistoryData: structureDataHistoryAdapter.redo,
    clearHistory(state) {
      state.past = []
      state.future = []
    },
    setStructureHistoryData: structureDataHistoryAdapter.undoable<StructureHistoryDataState>(
      (_, action) => action.payload
    ),
    changeStructureHistoryValue: structureDataHistoryAdapter.undoable<{
      fieldId: string
      value: any
    }>((state, action) => {
      const { fieldId, value } = action.payload
      state[fieldId] = value
    }),
    removeStructureHistoryValue: structureDataHistoryAdapter.undoable<{ fieldId: string }>(
      (state, action) => {
        const { fieldId } = action.payload
        delete state[fieldId]
      }
    ),
  },
})

export const {
  undoHistoryData,
  redoHistoryData,
  clearHistory,
  setStructureHistoryData,
  changeStructureHistoryValue,
  removeStructureHistoryValue,
} = structureHistoryDataSlice.actions

export default structureHistoryDataSlice.reducer

export const selectStructureHistoryData = (state: RootState) => state.structureHistoryData.present
export const selectCanUndoHistoryData = (state: RootState) =>
  state.structureHistoryData.past.length > 0
export const selectCanRedoHistoryData = (state: RootState) =>
  state.structureHistoryData.future.length > 0
