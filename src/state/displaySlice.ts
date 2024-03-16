import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { z } from "zod"
import type { RootState } from "./store"

export const outputFormatSchema = z.enum(["html", "plain"])

export type OutputFormat = z.infer<typeof outputFormatSchema>

interface DisplayState {
  activeSectionId: null | string
  outputFormat: OutputFormat
  showFieldId: null | string
  structureDataModified: boolean
}

const initialState: DisplayState = {
  activeSectionId: null,
  outputFormat: "html",
  showFieldId: null,
  structureDataModified: false,
}

export const displaySlice = createSlice({
  name: "display",
  initialState,
  reducers: {
    activateSection(state, action: PayloadAction<{ sectionId: string }>) {
      const { sectionId } = action.payload
      state.activeSectionId = sectionId
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
    setStructureDataModified(state, action: PayloadAction<boolean>) {
      state.structureDataModified = action.payload
    },
  },
})

export const { activateSection, setOutputFormat, showField, setStructureDataModified } =
  displaySlice.actions

export default displaySlice.reducer

export const selectActiveSectionId = (state: RootState) => state.display.activeSectionId

export const selectOutputFormat = (state: RootState) => state.display.outputFormat

export const selectShowFieldId = (state: RootState) => state.display.showFieldId

export const selectStructureDataModified = (state: RootState) => state.display.structureDataModified
