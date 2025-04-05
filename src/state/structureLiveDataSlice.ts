import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { StructureData } from "~/schemas/structure"
import type { RootState } from "./store"

type StructureLiveDataState = StructureData

const initialState: StructureLiveDataState = {}

export const structureLiveDataSlice = createSlice({
  name: "structureLiveData",
  initialState,
  reducers: {
    setStructureLiveData(_, action: PayloadAction<StructureLiveDataState>) {
      return action.payload
    },
    changeStructureLiveValue(state, action: PayloadAction<{ fieldId: string; value: any }>) {
      const { fieldId, value } = action.payload
      state[fieldId] = value
    },
    removeStructureLiveValue(state, action: PayloadAction<{ fieldId: string }>) {
      const { fieldId } = action.payload
      delete state[fieldId]
    },
  },
})

export const { setStructureLiveData, changeStructureLiveValue, removeStructureLiveValue } =
  structureLiveDataSlice.actions

export default structureLiveDataSlice.reducer

export const selectStructureLiveValue = (fieldId: string) => (state: RootState) =>
  state.structureLiveData[fieldId]
