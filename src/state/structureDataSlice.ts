import { RootState } from "RootTypes"
import { z } from "zod"
import { createHistorySlice, withHistory } from "./historySlice"

export const structureDataSchema = z.record(z.any()) // {fieldId: value}

export type StructureDataState = z.infer<typeof structureDataSchema>

const initialState: StructureDataState = {}

export const structureDataSlice = createHistorySlice({
  name: "data",
  initialState,
  reducers: {
    resetStructureData() {
      return {
        past: {},
        present: initialState,
        future: {},
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

export const { resetStructureData, setStructureData, changeStructureValue } =
  structureDataSlice.actions

export default structureDataSlice.reducer

export const selectStructureData = (state: RootState) => state.structureData.present
