import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { createPatchHistoryAdapter } from "history-adapter/redux"
import { StructureData } from "~/schemas/structure"

export type StructureHistoryDataState = StructureData

const structureDataHistoryAdapter = createPatchHistoryAdapter<StructureHistoryDataState>()

const initialState = structureDataHistoryAdapter.getInitialState({})

export const structureHistoryDataSlice = createSlice({
  name: "structureHistoryData",
  initialState,
  reducers: {
    undoHistoryData: structureDataHistoryAdapter.undo,
    redoHistoryData: structureDataHistoryAdapter.redo,
    clearHistory: structureDataHistoryAdapter.clearHistory,
    setStructureHistoryData: structureDataHistoryAdapter.undoableReducer(
      (_, action) => action.payload
    ),
    changeStructureHistoryValue: {
      prepare: structureDataHistoryAdapter.withPayload<{ fieldId: string; value: any }>(),
      reducer: structureDataHistoryAdapter.undoableReducer(
        (state, action: PayloadAction<{ fieldId: string; value: any }>) => {
          const { fieldId, value } = action.payload
          state[fieldId] = value
        }
      ),
    },
    removeStructureHistoryValue: {
      prepare: structureDataHistoryAdapter.withPayload<{ fieldId: string }>(),
      reducer: structureDataHistoryAdapter.undoableReducer(
        (state, action: PayloadAction<{ fieldId: string }>) => {
          const { fieldId } = action.payload
          delete state[fieldId]
        }
      ),
    },
  },
  selectors: {
    ...structureDataHistoryAdapter.getSelectors(),
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

export const {
  selectCanUndo: selectCanUndoHistoryData,
  selectCanRedo: selectCanRedoHistoryData,
  selectPresent: selectStructureHistoryData,
} = structureHistoryDataSlice.selectors
