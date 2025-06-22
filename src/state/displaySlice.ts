import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { z } from "zod"
import type { RootState } from "./store"

export const outputFormatSchema = z.enum(["html", "plain"])
export const viewModeSchema = z.enum(["structure", "report"])

export type OutputFormat = z.infer<typeof outputFormatSchema>
export type ViewMode = z.infer<typeof viewModeSchema>

interface LogMessage {
  message: string
  level: "info" | "error" | "success"
  timestamp: number
}

interface Status {
  message: string
  state: "doing" | "ok" | "error"
}

interface DisplayState {
  activeSectionId: null | string
  outputFormat: OutputFormat
  showFieldId: null | string
  structureDataModified: boolean
  status: { [statusId: string]: Status }
  log: LogMessage[]
  viewMode: ViewMode
}

const initialState: DisplayState = {
  activeSectionId: null,
  outputFormat: "html",
  showFieldId: null,
  structureDataModified: false,
  status: {},
  log: [],
  viewMode: "structure",
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
    updateStatus(state, action: PayloadAction<{ statusId: string; status: Status }>) {
      const { statusId, status } = action.payload
      state.status[statusId] = status
    },
    deleteStatus(state, action: PayloadAction<{ statusId: string }>) {
      const { statusId } = action.payload
      delete state.status[statusId]
    },
    appendToLog(
      state,
      action: PayloadAction<{ message: string; level: "info" | "error" | "success" }>
    ) {
      const timestamp = Date.now()
      if (state.log.length > 100) {
        state.log.push({ ...action.payload, timestamp })
        state.log.shift()
      } else {
        state.log.push({ ...action.payload, timestamp })
      }
    },
    clearLog(state) {
      state.log = []
    },
    setViewMode(state, action: PayloadAction<ViewMode>) {
      state.viewMode = action.payload
    },
  },
})

export const {
  activateSection,
  setOutputFormat,
  showField,
  setStructureDataModified,
  updateStatus,
  deleteStatus,
  appendToLog,
  clearLog,
  setViewMode,
} = displaySlice.actions

export default displaySlice.reducer

export const selectActiveSectionId = (state: RootState) => state.display.activeSectionId

export const selectOutputFormat = (state: RootState) => state.display.outputFormat

export const selectShowFieldId = (state: RootState) => state.display.showFieldId

export const selectStructureDataModified = (state: RootState) => state.display.structureDataModified

export const selectStatus = (state: RootState) => state.display.status

export const selectLog = (state: RootState) => state.display.log

export const selectViewMode = (state: RootState) => state.display.viewMode
