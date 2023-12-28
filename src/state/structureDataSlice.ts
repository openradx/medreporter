import { z } from "zod"
import { createHistorySlice, withHistory } from "./historySlice"
import type { RootState } from "./store"

export const structureDataSchema = z.record(z.any()) // {fieldId: value}

export type StructureDataState = z.infer<typeof structureDataSchema>

const initialState: StructureDataState = {}

export const structureDataSlice = createHistorySlice({
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
    setStructureData: withHistory<StructureDataState, StructureDataState>(
      (_, action) => action.payload
    ),
    changeStructureValue: withHistory<StructureDataState, { fieldId: string; value: any }>(
      (state, action) => {
        const { fieldId, value } = action.payload
        state[fieldId] = value
      }
    ),
  },
})

export const { undo, redo, resetStructureData, setStructureData, changeStructureValue } =
  structureDataSlice.actions

// TODO: remove, just for debugging purposes
changeStructureValue({ fieldId: "a", value: 1 })

export default structureDataSlice.reducer

export const selectStructureData = (state: RootState) => state.structureData.present
