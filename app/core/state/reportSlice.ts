import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "RootTypes"
import { z } from "zod"

type SaveStatus = "dirty" | "saving" | "saved" | "error"

export const FormatSchema = z.object({
  showSectionTitles: z.boolean(),
})

type FormatState = z.infer<typeof FormatSchema>

export const MetaInfoSchema = z.object({
  key: z.string(),
  type: z.enum(["string", "dateTime", "int", "float"]),
  value: z.string().or(z.number()),
})

type MetaInfoState = z.infer<typeof MetaInfoSchema>

type ReportState = {
  reportId: string | null
  saveStatus: SaveStatus
  format: FormatState
  metaInfos: MetaInfoState[]
}

const initialState: ReportState = {
  reportId: null,
  saveStatus: "dirty",
  format: {
    showSectionTitles: true,
  },
  metaInfos: [],
}

export const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    setReportId(state, action: PayloadAction<string>) {
      state.reportId = action.payload
    },
    setSaveStatus(state, action: PayloadAction<SaveStatus>) {
      state.saveStatus = action.payload
    },
    setFormat(state, action: PayloadAction<FormatState>) {
      Object.assign(state, action.payload)
    },
    setMetaInfos(state, action: PayloadAction<MetaInfoState[]>) {
      state.metaInfos = action.payload
    },
  },
})

export const { setReportId, setSaveStatus, setFormat, setMetaInfos } = reportSlice.actions

export default reportSlice.reducer

export const selectReportId = (state: RootState) => state.report.reportId

export const selectSaveStatus = (state: RootState) => state.report.saveStatus

export const selectFormat = (state: RootState): FormatState =>
  (({ showSectionTitles }) => ({ showSectionTitles }))(state.report.format)

export const selectShowSectionTitles = (state: RootState) => state.report.format.showSectionTitles

export const selectMetaInfos = (state: RootState) => state.report.metaInfos
