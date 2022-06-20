import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "RootTypes"

interface ScrollIntoState {
  moduleId: string
  fieldId?: string
}

interface DisplayState {
  dataInitialized: boolean
  activeSectionId: null | string
  scrollInto: null | ScrollIntoState
}

const initialState: DisplayState = {
  dataInitialized: false,
  activeSectionId: null,
  scrollInto: null,
}

export const displaySlice = createSlice({
  name: "display",
  initialState,
  reducers: {
    activateSection(
      state,
      action: PayloadAction<{ sectionId: string; scrollInto?: ScrollIntoState }>
    ) {
      const { sectionId, scrollInto } = action.payload
      state.activeSectionId = sectionId
      state.scrollInto = scrollInto ?? null
    },
    setDataInitialized(state) {
      state.dataInitialized = true
    },
  },
})

export const { activateSection, setDataInitialized } = displaySlice.actions

export default displaySlice.reducer

export const selectDataInitialized = (state: RootState) => state.display.dataInitialized

export const selectActiveSectionId = (state: RootState) => state.display.activeSectionId

export const selectScrollInto = (state: RootState) => state.display.scrollInto
