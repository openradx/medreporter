import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "RootTypes"
import { z } from "zod"

export const outputFormatSchema = z.enum(["html", "plain"])

export type OutputFormat = z.infer<typeof outputFormatSchema>

interface DisplayState {
  dataInitialized: boolean
  activeSectionId: null | string
  showFieldId: null | string
  outputFormat: OutputFormat
}

const initialState: DisplayState = {
  dataInitialized: false,
  activeSectionId: null,
  showFieldId: null,
  outputFormat: "html",
}

export const displaySlice = createSlice({
  name: "display",
  initialState,
  reducers: {
    activateSection(state, action: PayloadAction<{ sectionId: string }>) {
      const { sectionId } = action.payload
      state.activeSectionId = sectionId
    },
    setDataInitialized(state) {
      state.dataInitialized = true
    },
    setOutputFormat(state, action: PayloadAction<{ outputFormat: OutputFormat }>) {
      const { outputFormat } = action.payload
      state.outputFormat = outputFormat
    },
    showField(state, action: PayloadAction<{ sectionId?: string; fieldId: string }>) {
      const { sectionId, fieldId } = action.payload
      if (sectionId !== undefined) {
        state.activeSectionId = sectionId
      }
      state.showFieldId = fieldId
    },
  },
})

export const { activateSection, setDataInitialized, setOutputFormat, showField } =
  displaySlice.actions

export default displaySlice.reducer

export const selectDataInitialized = (state: RootState) => state.display.dataInitialized

export const selectActiveSectionId = (state: RootState) => state.display.activeSectionId

export const selectShowFieldId = (state: RootState) => state.display.showFieldId

export const selectOutputFormat = (state: RootState) => state.display.outputFormat
