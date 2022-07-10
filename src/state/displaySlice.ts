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
  reportFormat: "html" | "text"
}

const initialState: DisplayState = {
  dataInitialized: false,
  activeSectionId: null,
  scrollInto: null,
  reportFormat: "html",
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
    setReportFormat(state, action: PayloadAction<{ reportFormat: "html" | "text" }>) {
      const { reportFormat } = action.payload
      state.reportFormat = reportFormat
    },
  },
})

export const { activateSection, setDataInitialized, setReportFormat } = displaySlice.actions

export default displaySlice.reducer

export const selectDataInitialized = (state: RootState) => state.display.dataInitialized

export const selectActiveSectionId = (state: RootState) => state.display.activeSectionId

export const selectScrollInto = (state: RootState) => state.display.scrollInto

export const selectReportFormat = (state: RootState) => state.display.reportFormat
