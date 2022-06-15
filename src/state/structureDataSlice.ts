import { RootState } from "RootTypes"
import { z } from "zod"
import { createHistorySlice, withHistory } from "./historySlice"

// moduleId -> fieldId -> value
export const StructureDataSchema = z.record(z.record(z.any()))

export type StructureDataState = z.infer<typeof StructureDataSchema>

const initialState: StructureDataState = {}

export const structureDataSlice = createHistorySlice({
  name: "structureData",
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
    changeStructureValue: withHistory<
      StructureDataState,
      { moduleId: string; fieldId: string; value: any }
    >((state, action) => {
      const { moduleId, fieldId, value } = action.payload
      state[moduleId][fieldId] = value
    }),
  },
})

export const { resetStructureData, setStructureData, changeStructureValue } =
  structureDataSlice.actions

export default structureDataSlice.reducer

export const selectStructureData = (state: RootState) => state.structureData.present
